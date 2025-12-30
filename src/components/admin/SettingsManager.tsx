import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, X, Plus, Trash2, Settings2, ToggleLeft, AlertTriangle, Check, Pencil, Terminal, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string;
}

const BOOLEAN_SETTINGS = ['maintenance_mode', 'enable_contact_form', 'show_achievements', 'show_projects', 'show_research'];

const SETTING_CATEGORIES: Record<string, string[]> = {
  'System': ['maintenance_mode'],
  'Features': ['enable_contact_form', 'show_achievements', 'show_projects', 'show_research'],
  'Site Identity': ['site_title', 'hero_tagline', 'site_description', 'site_logo_url', 'favicon_url'],
  'Contact': ['contact_email', 'contact_phone', 'location', 'contact_form_recipient'],
  'Social Links': ['github_url', 'linkedin_url', 'twitter_url', 'instagram_url', 'youtube_url'],
  'About': ['about_bio', 'about_full', 'skills'],
  'SEO': ['google_analytics_id', 'meta_keywords', 'og_image'],
};

const DEFAULT_SETTINGS = [
  { key: 'maintenance_mode', value: 'false', description: 'Put site in maintenance mode (blocks public access)' },
  { key: 'site_title', value: 'My Portfolio', description: 'Main site title shown in browser tab' },
  { key: 'hero_tagline', value: 'Building the future', description: 'Tagline displayed on hero section' },
  { key: 'site_description', value: 'Personal portfolio', description: 'SEO meta description' },
  { key: 'contact_email', value: '', description: 'Primary contact email' },
  { key: 'github_url', value: '', description: 'GitHub profile URL' },
  { key: 'linkedin_url', value: '', description: 'LinkedIn profile URL' },
  { key: 'enable_contact_form', value: 'true', description: 'Show contact form on site' },
  { key: 'show_achievements', value: 'true', description: 'Display achievements section' },
  { key: 'show_projects', value: 'true', description: 'Display projects section' },
];

const SettingsManager = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key');
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSettings(data || []);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    const setting = settings.find(s => s.key === key);
    if (!setting) return;

    const { error } = await supabase
      .from('site_settings')
      .update({ value })
      .eq('id', setting.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `${key} has been updated` });
      fetchSettings();
    }
    setEditingKey(null);
  };

  const toggleBooleanSetting = async (key: string, currentValue: string) => {
    const newValue = currentValue === 'true' ? 'false' : 'true';
    await updateSetting(key, newValue);
  };

  const deleteSetting = async (id: string, key: string) => {
    if (!confirm(`Delete setting "${key}"? This cannot be undone.`)) return;

    const { error } = await supabase
      .from('site_settings')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: `${key} has been removed` });
      fetchSettings();
    }
  };

  const addSetting = async () => {
    if (!newKey.trim() || !newValue.trim()) {
      toast({ title: "Error", description: "Key and value are required", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from('site_settings')
      .insert([{ key: newKey.toLowerCase().replace(/\s+/g, '_'), value: newValue, description: newDescription }]);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Created", description: "New setting added" });
      setNewKey("");
      setNewValue("");
      setNewDescription("");
      setShowAddForm(false);
      fetchSettings();
    }
  };

  const initializeDefaults = async () => {
    const existingKeys = settings.map(s => s.key);
    const missing = DEFAULT_SETTINGS.filter(d => !existingKeys.includes(d.key));
    
    if (missing.length === 0) {
      toast({ title: "Info", description: "All default settings already exist" });
      return;
    }

    const { error } = await supabase.from('site_settings').insert(missing);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Added ${missing.length} default settings` });
      fetchSettings();
    }
  };

  const getSettingByKey = (key: string) => settings.find(s => s.key === key);
  const isBooleanSetting = (key: string) => BOOLEAN_SETTINGS.includes(key);
  const maintenanceMode = getSettingByKey('maintenance_mode')?.value === 'true';

  const renderSettingRow = (setting: Setting) => {
    const isBoolean = isBooleanSetting(setting.key);
    const isEditing = editingKey === setting.key;

    return (
      <div 
        key={setting.id} 
        className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
          setting.key === 'maintenance_mode' && setting.value === 'true' 
            ? 'bg-red-950/30 border-red-500/30' 
            : 'bg-card/30 border-white/5 hover:border-white/10'
        }`}
      >
        <div className="flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-2 mb-1">
            <code className="text-sm font-bold text-primary">{setting.key}</code>
            {setting.key === 'maintenance_mode' && setting.value === 'true' && (
              <Badge variant="destructive" className="text-xs animate-pulse">ACTIVE</Badge>
            )}
          </div>
          {setting.description && (
            <p className="text-xs text-muted-foreground truncate">{setting.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isBoolean ? (
            <Switch
              checked={setting.value === 'true'}
              onCheckedChange={() => toggleBooleanSetting(setting.key, setting.value)}
              className={setting.key === 'maintenance_mode' ? 'data-[state=checked]:bg-red-500' : ''}
            />
          ) : isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-48 h-8 text-sm"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={() => updateSetting(setting.key, editValue)}>
                <Check size={14} />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditingKey(null)}>
                <X size={14} />
              </Button>
            </div>
          ) : (
            <>
              <code className="text-sm bg-muted/50 px-2 py-1 rounded max-w-[200px] truncate">
                {setting.value || '(empty)'}
              </code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => { setEditingKey(setting.key); setEditValue(setting.value); }}
              >
                <Pencil size={14} />
              </Button>
            </>
          )}
          <Button size="sm" variant="ghost" onClick={() => deleteSetting(setting.id, setting.key)} className="text-destructive hover:text-destructive">
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    );
  };

  const getCategorySettings = (category: string) => {
    const keys = SETTING_CATEGORIES[category] || [];
    return settings.filter(s => keys.includes(s.key));
  };

  const getUncategorizedSettings = () => {
    const allCategorizedKeys = Object.values(SETTING_CATEGORIES).flat();
    return settings.filter(s => !allCategorizedKeys.includes(s.key));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold glow-text mb-2 flex items-center gap-3">
            <Settings2 className="text-primary" />
            Settings Manager
          </h2>
          <p className="text-muted-foreground text-sm">
            Configure site behavior, content, and integrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={initializeDefaults} variant="outline" size="sm" className="gap-2">
            <Zap size={16} />
            Init Defaults
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)} size="sm" className="gap-2">
            <Plus size={16} />
            Add Setting
          </Button>
        </div>
      </div>

      {/* Maintenance Mode Banner */}
      {maintenanceMode && (
        <Card className="bg-red-950/50 border-red-500/50 animate-pulse">
          <CardContent className="py-4 flex items-center gap-4">
            <AlertTriangle className="text-red-400" size={24} />
            <div>
              <h3 className="text-red-400 font-bold">Maintenance Mode Active</h3>
              <p className="text-sm text-red-400/70">Your site is currently showing a maintenance page to visitors.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Setting Form */}
      {showAddForm && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus size={18} /> Add New Setting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="setting_key"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="font-mono"
              />
              <Input
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addSetting} size="sm">
                <Save size={14} className="mr-2" /> Save Setting
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings by Category */}
      <Tabs defaultValue="System" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/30 p-1">
          {Object.keys(SETTING_CATEGORIES).map(cat => (
            <TabsTrigger key={cat} value={cat} className="text-xs px-3 py-1.5">
              {cat}
              <Badge variant="secondary" className="ml-2 text-xs">
                {getCategorySettings(cat).length}
              </Badge>
            </TabsTrigger>
          ))}
          <TabsTrigger value="Other" className="text-xs px-3 py-1.5">
            Other
            <Badge variant="secondary" className="ml-2 text-xs">
              {getUncategorizedSettings().length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {Object.keys(SETTING_CATEGORIES).map(cat => (
          <TabsContent key={cat} value={cat} className="mt-4 space-y-2">
            {getCategorySettings(cat).length === 0 ? (
              <Card className="bg-muted/20 border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>No settings in this category yet.</p>
                  <p className="text-sm">Click "Init Defaults" to add recommended settings.</p>
                </CardContent>
              </Card>
            ) : (
              getCategorySettings(cat).map(renderSettingRow)
            )}
          </TabsContent>
        ))}

        <TabsContent value="Other" className="mt-4 space-y-2">
          {getUncategorizedSettings().length === 0 ? (
            <Card className="bg-muted/20 border-dashed">
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>No uncategorized settings.</p>
              </CardContent>
            </Card>
          ) : (
            getUncategorizedSettings().map(renderSettingRow)
          )}
        </TabsContent>
      </Tabs>

      {/* All Settings Terminal View */}
      <Card className="bg-black/50 border-green-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-green-400 font-mono text-sm">
            <Terminal size={16} />
            settings.json
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="font-mono text-xs text-green-400/80 overflow-x-auto">
{`{
${settings.map(s => `  "${s.key}": "${s.value}"`).join(',\n')}
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;
