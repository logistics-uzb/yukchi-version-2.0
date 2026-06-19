export const Flag = ({ code = "" }: { code: string }) => (
  <div className="border border-gray-200 rounded-sm">
    <img
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      width={25}
      height={14}
      alt={code}
      loading="lazy"
      className="rounded-sm"
    />
  </div>
);
