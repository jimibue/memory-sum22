const Card = (props) => {
    
  const {isMatched, value, taco, show, id, disableClick} = props
  if (isMatched) {
    return <div className="item matched">{value}</div>;
  }
  if (show) {
    return <div className="item show">{value}</div>;
  }

  return <div onClick={disableClick ? ()=> {}: ()=>taco(id)} className={`item hide`}>-----</div>;
};
export default Card;
