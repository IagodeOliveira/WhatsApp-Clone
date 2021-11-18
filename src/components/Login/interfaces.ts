import { IFaceGoogleUser } from '../../interfaces';

export interface ILogin {
  onReceive: ({}: IFaceGoogleUser) => void;
}