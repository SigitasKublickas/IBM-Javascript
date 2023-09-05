type Props = { text: string };
export const InputDialog = (props: Props) => {
  return (
    <div className="input-danger">
      <div className="input-danger-text">{props.text}</div>
    </div>
  );
};
