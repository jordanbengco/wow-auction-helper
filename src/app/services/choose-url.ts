import { environment } from '../../environments/environment.prod';

export function chooseUrl(apiUrl: string, localUrl: string): string {
  if (!environment.production) {
    console.log('Using local files');
  }
  return !environment.production ? localUrl : apiUrl;
}
