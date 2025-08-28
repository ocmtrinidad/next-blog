export default function PasswordModal({
  password,
  setPassword,
  passwordError,
  isSubmitting,
  handlePasswordConfirm,
  handleModalClose,
}: {
  password: string;
  setPassword: (password: string) => void;
  passwordError: string;
  isSubmitting: boolean;
  handlePasswordConfirm: () => Promise<void>;
  handleModalClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-[#333333] flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-lg p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Verify Your Identity</h2>
        <p>Please enter your password to confirm these changes.</p>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePasswordConfirm();
              }
            }}
            disabled={isSubmitting}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleModalClose}
            disabled={isSubmitting}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePasswordConfirm}
            disabled={isSubmitting}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
