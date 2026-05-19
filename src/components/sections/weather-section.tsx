"use client";

import { CalendarDays, Cloud, CloudSun, Droplets, Eye, Sunrise, Sunset, ThermometerSun, Umbrella, Waves, Wind } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { usePreferences } from "@/components/layout/preference-provider";
import { getLocalizedHotelHighlights } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

type WeatherDay = {
  date: string;
  min: number;
  max: number;
  code: number;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
};

type WeatherState = {
  temperature: number;
  apparentTemperature: number;
  wind: number;
  humidity: number;
  cloudCover: number;
  precipitation: number;
  seaTemperature?: number;
  code: number;
  time: string;
  daily: WeatherDay[];
};

const fallback: WeatherState = {
  temperature: 24,
  apparentTemperature: 25,
  wind: 12,
  humidity: 56,
  cloudCover: 22,
  precipitation: 0,
  seaTemperature: 22,
  code: 1,
  time: "2026-05-18T12:00:00+03:00",
  daily: [
    { date: "2026-05-18T12:00:00+03:00", min: 18, max: 26, code: 1, precipitationProbability: 6, sunrise: "2026-05-18T06:02:00+03:00", sunset: "2026-05-18T20:18:00+03:00" },
    { date: "2026-05-19T12:00:00+03:00", min: 19, max: 27, code: 2, precipitationProbability: 12, sunrise: "2026-05-19T06:01:00+03:00", sunset: "2026-05-19T20:19:00+03:00" },
    { date: "2026-05-20T12:00:00+03:00", min: 20, max: 28, code: 1, precipitationProbability: 8, sunrise: "2026-05-20T06:00:00+03:00", sunset: "2026-05-20T20:20:00+03:00" },
  ],
};

function condition(code: number, language: "tr" | "en" | "de") {
  const labels = {
    clear: { tr: "Açık", en: "Clear", de: "Klar" },
    partly: { tr: "Parçalı bulutlu", en: "Partly cloudy", de: "Teilweise bewölkt" },
    fog: { tr: "Puslu", en: "Misty", de: "Dunstig" },
    lightRain: { tr: "Hafif yağış", en: "Light rain", de: "Leichter Regen" },
    showers: { tr: "Yağış geçişli", en: "Showers", de: "Schauer" },
    mild: { tr: "Ilık Ege havası", en: "Mild Aegean air", de: "Milde Ägäisluft" },
  };

  if (code === 0) return { label: labels.clear[language], icon: ThermometerSun };
  if ([1, 2, 3].includes(code)) return { label: labels.partly[language], icon: CloudSun };
  if ([45, 48].includes(code)) return { label: labels.fog[language], icon: Cloud };
  if (code >= 51 && code <= 67) return { label: labels.lightRain[language], icon: Umbrella };
  if (code >= 80) return { label: labels.showers[language], icon: Umbrella };
  return { label: labels.mild[language], icon: CloudSun };
}

function localeFor(language: "tr" | "en" | "de") {
  return language === "tr" ? "tr-TR" : language === "de" ? "de-DE" : "en-US";
}

function formatDate(value: string, language: "tr" | "en" | "de", weekday = true) {
  return new Intl.DateTimeFormat(localeFor(language), {
    weekday: weekday ? "long" : undefined,
    day: "numeric",
    month: "long",
  }).format(new Date(value));
}

function formatTime(value: string, language: "tr" | "en" | "de") {
  return new Intl.DateTimeFormat(localeFor(language), {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function WeatherSection() {
  const { t, language } = usePreferences();
  const [weather, setWeather] = useState<WeatherState>(fallback);
  const highlights = getLocalizedHotelHighlights(language);
  const current = useMemo(() => condition(weather.code, language), [language, weather.code]);
  const CurrentIcon = current.icon;
  const today = weather.daily[0] ?? fallback.daily[0];
  
  const copy = {
    tr: {
      title: "Urla Atmosferi",
      subtitle: "Sahil yürüyüşü ve şarap bağı gezinizi Ege havasına göre planlayın.",
      feels: "Hissedilen",
      wind: "Rüzgar",
      humidity: "Nem",
      cloud: "Bulut",
      rain: "Yağış",
      sea: "Deniz suyu",
      sunrise: "Gün doğumu",
      sunset: "Gün batımı",
      forecast: "3 Günlük Ritim",
      stay: "Seyahat Notları",
    },
    en: {
      title: "Urla Atmosphere",
      subtitle: "Plan your coastal walk and vineyard tour around the Aegean breeze.",
      feels: "Feels like",
      wind: "Wind",
      humidity: "Humidity",
      cloud: "Cloud",
      rain: "Rain",
      sea: "Sea water",
      sunrise: "Sunrise",
      sunset: "Sunset",
      forecast: "3-Day Rhythm",
      stay: "Stay Notes",
    },
    de: {
      title: "Urla Atmosphäre",
      subtitle: "Planen Sie Ihren Küstenspaziergang und Weintour nach der Ägäis-Brise.",
      feels: "Gefühlt",
      wind: "Wind",
      humidity: "Feuchte",
      cloud: "Wolken",
      rain: "Regen",
      sea: "Meer",
      sunrise: "Sonnenaufgang",
      sunset: "Sonnenuntergang",
      forecast: "3-Tage-Rhythmus",
      stay: "Aufenthaltsnotizen",
    },
  }[language];

  useEffect(() => {
    let alive = true;
    
    Promise.all([
      fetch("https://api.open-meteo.com/v1/forecast?latitude=38.3229&longitude=26.7640&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,cloud_cover,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe%2FIstanbul&forecast_days=3").then((res) => res.json()),
      fetch("https://marine-api.open-meteo.com/v1/marine?latitude=38.3229&longitude=26.7640&current=ocean_temperature&timezone=Europe%2FIstanbul").then((res) => res.json()).catch(() => ({}))
    ])
    .then(([data, marineData]) => {
      if (!alive || !data.current || !data.daily) return;
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
        wind: Math.round(data.current.wind_speed_10m),
        humidity: data.current.relative_humidity_2m,
        cloudCover: data.current.cloud_cover,
        precipitation: data.current.precipitation,
        seaTemperature: marineData?.current?.ocean_temperature ? Math.round(marineData.current.ocean_temperature) : 22,
        code: data.current.weather_code,
        time: data.current.time,
        daily: data.daily.time.map((date: string, index: number) => ({
          date,
          min: Math.round(data.daily.temperature_2m_min[index]),
          max: Math.round(data.daily.temperature_2m_max[index]),
          code: data.daily.weather_code[index],
          precipitationProbability: data.daily.precipitation_probability_max[index] ?? 0,
          sunrise: data.daily.sunrise[index],
          sunset: data.daily.sunset[index],
        })),
      });
    })
    .catch(() => undefined);
    
    return () => {
      alive = false;
    };
  }, []);

  const metrics = [
    { label: copy.feels, value: `${weather.apparentTemperature}\u00b0`, icon: ThermometerSun },
    { label: copy.sea, value: `${weather.seaTemperature}\u00b0`, icon: Waves },
    { label: copy.wind, value: `${weather.wind} km/s`, icon: Wind },
    { label: copy.humidity, value: `%${weather.humidity}`, icon: Droplets },
    { label: copy.cloud, value: `%${weather.cloudCover}`, icon: Eye },
    { label: copy.rain, value: weather.precipitation > 0 ? `${weather.precipitation} mm` : `%${today.precipitationProbability}`, icon: Umbrella },
  ];

  return (
    <section className="mx-auto max-w-[90rem] px-5 py-6 md:px-8">
      <Reveal>
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--line)] shadow-[var(--shadow-sm)] p-4 md:p-6 lg:p-8">
          
          {/* Main Weather */}
          <div className="flex items-center gap-6 xl:w-1/4">
            <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--brand-sea)]/5 border border-[var(--brand-sea)]/10 text-[var(--brand-sea)]">
              <CurrentIcon size={32} />
            </div>
            <div>
              <div className="flex items-end gap-2">
                <span className="serif-heading text-[3.5rem] leading-[0.8] text-[var(--foreground)] tracking-tighter">
                  {weather.temperature}&deg;
                </span>
                <span className="text-[13px] font-semibold tracking-widest text-[var(--muted)] uppercase mb-1">
                  {current.label}
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-[var(--muted)]/80 uppercase">
                {formatDate(weather.time, language)}
              </p>
            </div>
          </div>

          <div className="hidden xl:block w-px h-16 bg-[var(--line)]" />

          {/* Metrics Horizontal */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 flex-grow">
            {metrics.filter(m => m.label !== copy.cloud).map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[var(--brand-olive)]">
                  <metric.icon size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] line-clamp-1">{metric.label}</span>
                </div>
                <strong className="text-lg font-medium text-[var(--foreground)] tracking-tight">{metric.value}</strong>
              </div>
            ))}
          </div>

          <div className="hidden xl:block w-px h-16 bg-[var(--line)]" />

          {/* 3 Days Mini */}
          <div className="flex gap-4 md:gap-6 xl:w-1/4 pt-6 xl:pt-0 border-t border-[var(--line)] xl:border-none">
            {weather.daily.map((day) => {
              const DayIcon = condition(day.code, language).icon;
              return (
                <div key={day.date} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">{formatDate(day.date, language, false).split(' ')[0]}</span>
                  <div className="text-[var(--brand-sea)]">
                    <DayIcon size={18} />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-sm font-semibold text-[var(--foreground)]">{day.max}&deg;</span>
                    <span className="font-mono text-[10px] font-medium text-[var(--muted)]">{day.min}&deg;</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Reveal>
    </section>
  );
}
