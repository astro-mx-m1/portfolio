import { Helmet } from "react-helmet";
import { useSettings, getSetting } from "@/hooks/useSettings";

const SettingsHelmet = () => {
  const { data } = useSettings();
  if (!data) return null;

  const title = getSetting(data.settingsMap, 'site_title', 'Mithil Katkoria');
  const description = getSetting(data.settingsMap, 'site_description', 'Portfolio and projects.');
  const favicon = getSetting(data.settingsMap, 'favicon_url', '');

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {favicon && <link rel="icon" href={favicon} />}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default SettingsHelmet;
