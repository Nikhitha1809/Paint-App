  type props={
    setBrushColor:(color:string)=>void;
    setBrushOpacity:(opacity:number)=>void;
    setBrushWidth:(width:number)=>void;
    brushWidth:number;
    brushOpacity:number;
  }

  function Tools({setBrushColor,setBrushOpacity,setBrushWidth,brushOpacity,brushWidth}:props) {
    return (
      <div>
        <label htmlFor="brush_color">Brush Color:</label>
        <input type="color" id="brush_color" onChange={((e)=> {
          console.log(e.target.value)
           setBrushColor(e.target.value)})}/>

        <label htmlFor="brush_opacity">Brush Opacity:</label>
        <input type="range" id="brush_opacity" value={brushOpacity} min="0" step="0.1" max="1" onChange={((e)=>{
          console.log(e.target.value)
          setBrushOpacity(Number(e.target.value))
          })}/>

        <label htmlFor="brush_width">Brush width:</label>
        <input type="range" id="brush_width" value={brushWidth} min="2" max="15" onChange={((e)=>setBrushWidth(Number(e.target.value)))}/>
      </div>
    );
  }

  export default Tools;
