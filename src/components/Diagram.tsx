import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


// Main Diagram controller for SVG markup strings

const Diagram = ({ diagram }: { diagram: string[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    // Remove previous zoom behavior
    svg.on('.zoom', null);

    // Set up D3 zoom
    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 10])
        .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          g.attr('transform', event.transform.toString());
        })
    );
  }, [diagram]);

  return (
    <svg ref={svgRef} width="400" height="400" style={{ border: '1px solid #006699', cursor: 'grab' }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
      <g ref={gRef}>
        {diagram.map((svgMarkup, idx) => (
          <g key={idx} dangerouslySetInnerHTML={{ __html: svgMarkup }} />
        ))}
      </g>
    </svg>
  );
};

export default Diagram;
