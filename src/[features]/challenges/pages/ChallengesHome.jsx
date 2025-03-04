import CoinIcon from '../../../assets/icons/coin.svg';

function ChallengesHome() {
  return (
    <div className="max-w-screen-xl container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* header section */}
      <div className="flex justify-between items-center mb-6 mt-14">
        <div>
          <h1 className="text-3xl text-text-gray">Challenges</h1>
          <p className="text-text-gray">Available Challenges</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-gray-700">Current Points</span>
          <div className="flex flex-row gap-x-2 items-center">
            <img src={CoinIcon} alt="coin" className="w-6 h-6" />
            <span className="text-text-gray text-xl">1,234</span>
          </div>
        </div>
      </div>

      {/* add challenge button */}
      <div className="flex justify-end mb-6">
        <button className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Add Challenge
        </button>
      </div>
    </div>
  );
}

export default ChallengesHome;
