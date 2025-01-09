const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };
  const strength = getStrength(password);
  const width = `${(strength / 5) * 100}%`;

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width,
            backgroundColor:
              strength < 2 ? "red" : strength < 4 ? "orange" : "green",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
