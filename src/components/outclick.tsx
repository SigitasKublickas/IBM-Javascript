import { useRef, useEffect } from "react";

type Props = {
  style: string;
  outclick: () => void;
  children: any;
};
export default function OutsideAlerter(props: Props) {
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.outclick();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className={props.style} ref={wrapperRef}>
      {props.children}
    </div>
  );
}
