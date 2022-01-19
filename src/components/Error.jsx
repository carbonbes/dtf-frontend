import { Frown } from "react-feather";

const Error = (props) => {
  return (
    <div className="error__block">
      <div className="error__body">
        <Frown />
        <div>
          <h1 className="error__body-title">Ошибка {props.code}</h1>
          <span className="error__body-description">{props.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
