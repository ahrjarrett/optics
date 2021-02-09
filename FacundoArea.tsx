function calculateXScale = (xExtent, width) {
  return xScale = scaleTime()
      .domain(xExtent)
      .range([0, width])
}

function deriveArea(xScale, yScale) {
  return d3
    .area()
    .x((d) => xScale(new Date (d.date)))
    .y1((d) => yScale(d.population))
    .y0(yScale(0));
}

function draw(area, svg, data) {
  return svg
    .append('path')
    .attr('d', area(data))
    .attr('stroke', '#147F90')
    .attr('fill', '#9CE756');
}

function AreaChart({ data }) {
  const svgRef = useRef();
  const width = 500;
  const  height = 300;
  useEffect(() => {
    const svg = select(svgRef.current);
    // Scale (x axis)
    const xExtent = extent(data, (d) => new Date (d.date));

    const xScale = calculateXScale(xExtend, width);
    // Scale (y axis)
    const yMax = max(data, (d) => d.population);
    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);
    // x Axis
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(d3.timeFormat("%Y-%b-%d"))
    svg
      .select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .call(xAxis);
    // y Axis
    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').call(yAxis);
    // Area

    const area = deriveArea(xScale, yScale)
    draw(area, svg, data)
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef} width={width} height={height} className={styles['chart']}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
}
export default AreaChart;
