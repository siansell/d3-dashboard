import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3";
// import timelineData from "./timelineData";

// const alreadyInView = (currentTranslate, currentScale, xExtent, yExtent) => {
//     const visibleBounds = {
//         margin: {
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//         },
//         height,
//         width,
//     };

//     const viewportXLeft = (-currentTranslate[0] + visibleBounds.margin.left) / currentScale;
//     const viewportXRight = viewportXLeft + (visibleBounds.width / currentScale);
//     const isAlreadyInviewX = xExtent[0] > viewportXLeft && xExtent[1] < viewportXRight;

//     const viewportYTop = (-currentTranslate[1] + visibleBounds.margin.top) / currentScale;
//     const viewportYBottom = viewportYTop + (visibleBounds.height / currentScale.current);
//     const isAlreadyInviewY = yExtent[0] > viewportYTop && yExtent[1] < viewportYBottom;

//     // If these are inside the current viewport then return true
//     if (isAlreadyInviewX && isAlreadyInviewY) {
//         return true;
//     }

//     return false;
// };

const PLANET_RADIUS = 50;
const PLANET_COLOUR = 'green'
const SOURCE_COLOUR = 'blue'
const SOURCE_WIDTH = 50
const SOURCE_HEIGHT = 80

const margin = { top: 80, right: 20, bottom: 40, left: 40 };
const width = 1200;
const height = 800;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;



const Timeline = ({ chartId, chartTitle, data }) => {
    const isInitialisedRef = useRef(false)

    const innerChart = useRef(null);


    useEffect(() => {
        const transformsPerRow = 3;
        // const transformWidth = innerWidth / transformsPerRow;

        const formattedData = d3.group(data, (x, index) => Math.floor(index / transformsPerRow));
        console.log(formattedData)

        const init = () => {
            const svg = d3.select(`#${chartId}`)
            .append("svg")
            .style("height", height)
            .style("width", width)

            innerChart.current = svg
                .append("g")
                .attr("class", "inner-chart")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

            // source
            innerChart.current
                .append('rect')
                .attr('y', -SOURCE_HEIGHT/ 2 - 25)
                .attr('x', 0)
                .attr('width', SOURCE_WIDTH)
                .attr('height', SOURCE_HEIGHT)
                .attr('fill', SOURCE_COLOUR)

            // planet
            innerChart.current
                .append('circle')
                .attr('r', PLANET_RADIUS)
                .attr('fill', PLANET_COLOUR)

            const zoom = d3.zoom()
                .on('zoom', (e) => {
                    if (e.transform.k > 1.66) {
                         d3.selectAll('.tick-title')
                            .style('opacity', 0)

                        d3.selectAll('.tick-detail-rect').remove()

                        d3.selectAll('.tick-detail')
                            .append("rect")
                            .attr("class", "tick-detail-rect")
                            .attr('height', 20)
                            .attr('width', 20)
                            .attr('fill', '#bada55')
                            .attr("x", 855)
                            .attr("y", -40)
                        svg.attr('transform', e.transform)
                    } else {
                        d3.selectAll('.tick-title').style('opacity', 1)
                        svg.attr('transform', e.transform)
                    }
                })
            svg.call(zoom)

            isInitialisedRef.current = true;
        }

        const update = () => {
            const join = innerChart.current
                .selectAll('g')
                .data(formattedData)

            const segmentHeight = (innerHeight / (formattedData.size - 1)) - 25;
            const tickHeight = 30;

            join
                .enter()
                .append("g")
                .attr("transform", (d, i) => `translate(0, ${segmentHeight * i})`)
                .each(function () {
                    d3.select(this)
                        .append('line')
                        .attr("class", "segment")
                })
                .merge(join)
                .each(function (d) {
                    const join = d3.select(this)
                    join
                    .select('line.segment')
                        .attr('x1', 0)
                        .attr('x2', innerWidth)
                        .attr('y2', 0)
                        .attr('y1', 0)
                        .attr('stroke', 'black')

                    const tickData = d[1];
                    const tickLine = join
                        .selectAll('line.tick')
                        .data(tickData)

                    const nTicks = tickData.length;
                    const calcTickX = (d, i) => (innerWidth / (nTicks + 1)) * (i + 1)
                    const calcTickY = (d, i) => i % 2 === 0 ? - tickHeight - 10 : tickHeight + 20

                    tickLine
                        .enter()
                        .append("line")
                        .attr("class", "tick")
                        .merge(tickLine)
                        .attr("x1", (d, i) => (innerWidth / (nTicks + 1)) * (i + 1))
                        .attr("x2", (d, i) => (innerWidth / (nTicks + 1)) * (i + 1))
                        .attr("y1", 0)
                        .attr("y2", (d, i) => i % 2 === 0 ? -tickHeight : tickHeight)
                        .attr("stroke", "black")

                    const tickTitle = join
                        .selectAll('text')
                        .data(tickData)

                    tickTitle
                        .enter()
                        .append("g")
                        .attr("class", "tick-detail")
                        .append("text")
                        .merge(tickTitle)
                        .text((d) => d.title)
                        .attr("x", calcTickX)
                        .attr("y", calcTickY)
                        .attr("data-id", (d) => d.id)
                        .attr("class", "tick-title")
                        .attr("text-anchor", "middle")
                })

            innerChart.current.select('circle')
                .attr('cy', innerHeight)
                .attr('cx', innerWidth)
        }

        if (!isInitialisedRef.current) {
            init();
        }
        update();
    }, [chartId, data])


    return (
        <div className="dashboard-chart">
            {chartTitle && <h2>{chartTitle}</h2>}
            <div id={chartId} />
        </div>
    )
}

Timeline.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartTitle: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Timeline