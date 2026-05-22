type LPSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LPSearchBar({ value, onChange }: LPSearchBarProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="LP 검색"
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid #444",
        backgroundColor: "#111",
        color: "#fff",
        fontSize: "14px",
        outline: "none",
        marginBottom: "20px",
      }}
    />
  );
}
