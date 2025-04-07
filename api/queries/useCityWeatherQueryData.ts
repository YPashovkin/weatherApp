import { useQuery } from "@tanstack/react-query";
import { httpClient } from "./http-client";

export interface CityWeatherResponse extends ForecastCityWeatherProps {
  location?: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current?: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export type ForecastCityWeatherProps = {
  forecast?: {
    forecastday: [
      {
        date: string;
        date_epoch: number;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avgtemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }
    ];
  }
}

export type CityWeatherError = {
  response?: {
    data: {
      error: {
        code: number;
        message: string;
      };
    };
  };
};

export const useCityWeatherQueryData = (city: string) => {
  return useQuery<CityWeatherResponse, Error & CityWeatherError>({
    queryKey: [`/v1/forecast.json`, city],
    queryFn: async () => {
      const res = await httpClient.get("/v1/forecast.json", {
        params: {
          q: city,
          days: 7,
          aqi: "no",
          lang: "ru",
        },
      });
      return res.data;
    },
    gcTime: 1000 * 60 * 60, // Data will be garbage collected after 1 hour
    staleTime: 1000 * 60 * 60, // Data will be considered fresh for 1 hour
  });
};
