type ProgressBarProps = {
  progress: number; // Progress should be a value between 0 and 100
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    transition: 'width 2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  };

  const containerStyles = {
    height: '16px',
    width: '80%',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyles} className="bg-customGray">
      <div style={fillerStyles} className="bg-customBlue">
      </div>
    </div>
  );
};

export default ProgressBar;
