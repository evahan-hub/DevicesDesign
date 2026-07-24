export interface ProfileListItem {
  [key: string]: unknown;
  profileId: number;
  encodedProfileId: string;
  profileName: string;
  profileType: 'Score based' | 'Action based';
  actionBased: boolean;
  defaultProfile: boolean;
  deprecated: boolean;
  premium: boolean;
  assignedMerchantCodes: number;
  lastModified: string;
  runningExperiment: boolean;
}
