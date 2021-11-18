import { Container, SignInContainer } from  './styles';
import firebaseAuth from '../../firebaseAuth';
import { ParticleBackground } from '../ParticleBackground';
import { ILogin } from './interfaces';

export default ({ onReceive }: ILogin) => {
  const handleFacebookLogin = async () => {
    const result = await firebaseAuth.fbPopup();
    if(result) {
      onReceive(result.user);
    } else {
      alert('An error occurred at Facebook login');
    }
  }

  const handleGoogleLogin = async () => {
    const result = await firebaseAuth.googlePopup();
    if(result) {
      onReceive(result.user);
    } else {
      alert('An error occurred at Google login');
    }
  }

  return (
    <>
      <ParticleBackground />
      <Container>
        <SignInContainer>
          <button className="faceButton" onClick={handleFacebookLogin}>
              Login with Facebook
          </button>
          <button onClick={handleGoogleLogin}>
              Login with Google
          </button>
        </SignInContainer>
      </Container>
    </>
  )
}