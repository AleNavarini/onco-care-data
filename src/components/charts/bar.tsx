import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import exp from 'constants';

type BarChartProps = {
  data: { name: string; value: number }[];
  width: number;
  height: number;
};

const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear the SVG before drawing
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);

    // Set up margins
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([innerHeight, 0]);

    // Append a group element to the SVG
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(d.value))
      .attr('fill', 'steelblue');

    // Add the X Axis
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add the Y Axis
    g.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default BarChart;
