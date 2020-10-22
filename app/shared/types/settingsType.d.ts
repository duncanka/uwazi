/* eslint-disable */
/**AUTO-GENERATED. RUN yarn emit-types to update.*/

import { ObjectIdSchema, LanguagesListSchema, GeolocationSchema } from 'shared/types/commonTypes';

export interface SettingsFilterSchema {
  _id?: ObjectIdSchema;
  id?: string;
  name?: string;
  items?: unknown;
}

export interface SettingsSyncTemplateSchema {
  properties: string[];
  filter?: string;
}

export type SettingsSyncRelationtypesSchema = string[];

export interface SettingsSyncSchema {
  url?: string;
  active?: boolean;
  username?: boolean;
  password?: boolean;
  config?: {
    templates?: {
      [k: string]:
        | (
            | {
                properties: string[];
                filter?: string;
              }
            | string[]
          )
        | undefined;
    };
    relationTypes?: string[];
  };
}

export interface SettingsLinkSchema {
  _id?: ObjectIdSchema;
  title?: string;
  url?: string;
}

export interface Settings {
  _id?: ObjectIdSchema;
  __v?: number;
  project?: string;
  site_name?: string;
  contactEmail?: string;
  home_page?: string;
  private?: boolean;
  cookiepolicy?: boolean;
  mailerConfig?: string;
  publicFormDestination?: string;
  allowedPublicTemplates?: string[];
  analyticsTrackingId?: string;
  matomoConfig?: string;
  dateFormat?: string;
  custom?: unknown;
  customCSS?: string;
  mapTilerKey?: string;
  newNameGeneration?: true;
  sync?: SettingsSyncSchema;
  languages?: LanguagesListSchema;
  filters?: SettingsFilterSchema[];
  links?: SettingsLinkSchema[];
  features?: {
    _id?: string;
    semanticSearch?: boolean;
    topicClassification?: boolean;
    favorites?: boolean;
    [k: string]: unknown | undefined;
  };
  mapStartingPoint?: {
    label?: string;
    lat: number;
    lon: number;
  }[];
}
