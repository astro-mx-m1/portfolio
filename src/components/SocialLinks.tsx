import { useSettings, getSetting } from "@/hooks/useSettings";
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialLinks = () => {
  const { data } = useSettings();

  if (!data) return null;

  const githubUrl = getSetting(data.settingsMap, 'github_url', '');
  const linkedinUrl = getSetting(data.settingsMap, 'linkedin_url', '');
  const twitterUrl = getSetting(data.settingsMap, 'twitter_url', '');
  const instagramUrl = getSetting(data.settingsMap, 'instagram_url', '');
  const youtubeUrl = getSetting(data.settingsMap, 'youtube_url', '');
  const email = getSetting(data.settingsMap, 'contact_email', '');

  return (
    <div className="flex items-center gap-3">
      {githubUrl && (
        <Button variant="outline" size="icon" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
        </Button>
      )}
      {linkedinUrl && (
        <Button variant="outline" size="icon" asChild>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </Button>
      )}
      {twitterUrl && (
        <Button variant="outline" size="icon" asChild>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter size={20} />
          </a>
        </Button>
      )}
      {instagramUrl && (
        <Button variant="outline" size="icon" asChild>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
        </Button>
      )}
      {youtubeUrl && (
        <Button variant="outline" size="icon" asChild>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Youtube size={20} />
          </a>
        </Button>
      )}
      {email && (
        <Button variant="outline" size="icon" asChild>
          <a href={`mailto:${email}`} aria-label="Email">
            <Mail size={20} />
          </a>
        </Button>
      )}
    </div>
  );
};

export default SocialLinks;
