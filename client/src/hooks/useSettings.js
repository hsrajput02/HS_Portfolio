import { useEffect, useState } from "react";
import { getSettings } from "../api/portfolioApi";

function useSettings() {

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadSettings = async () => {

      try {

        const res = await getSettings();

        setSettings(res.data.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadSettings();

  }, []);

  return { settings, loading };

}

export default useSettings;