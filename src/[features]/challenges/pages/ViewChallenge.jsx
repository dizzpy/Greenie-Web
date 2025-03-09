import NavBar from '../../../components/Shared/NavBar';
import ViewChallengeCard from '../components/ViewChallengeCard';

function ViewChallenge() {
  const challengeData = {
    image:
      'https://www.movaglobes.com/blog/wp-content/uploads/2022/04/Eco-Friendly-Header-Image-1200x600.jpg',
    name: 'Eco-Friendly Challenge',
    creator: 'John Doe',
    points: 500,
    description:
      'Join the eco-friendly challenge and help the environment by reducing waste. Participate and earn rewards while making a difference!',
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-white">
        <ViewChallengeCard challenge={challengeData} />
      </div>
    </div>
  );
}

export default ViewChallenge;
