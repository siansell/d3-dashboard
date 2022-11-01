import React, { useEffect } from "react"
import * as d3 from "d3"

import data from "./kpiData"

const kpisLayout = ({ kpis, profiles }) => {
    const newProfiles = profiles.map(p => {
        return {
            ...p,
            kpiValues: p.kpiValues.map(v => ({
                ...v,
                kpi: kpis.find(k => k.id === v.id)
            }))
        }
    })

    return {
        kpis,
        profiles: newProfiles,
    }
}

const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 1000;
const height = 340;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const CARD_MARGIN = 40
const BAR_HEIGHT = 20

const kpiComponent = selection => {
    selection.each(function (d, i) {
        console.log(d)
        const kpiG = d3.select(this)
            .attr("transform", `translate(${margin.left}, ${(i + 1)  * 40})`)
        kpiG
            .append("text")
            .text(d.kpi.name)
            .attr("dominant-baseline", "text-after-edge")

        const contentsG = kpiG
            .append("g")
            .attr("class", "contents")

        contentsG
            .append("rect")
            .attr("width", "66%")
            .attr("height", BAR_HEIGHT)
            .attr("stroke", "green")
            .attr("stroke-width", "1px")
            .attr("fill", "transparent")

        const numbersG = contentsG
            .append("g")
            .attr("class", "numbers")
            .attr("transform", `translate(700, 0)`)
            .attr("dominant-baseline", "hanging")

        numbersG
            .append("text")
            .text(d.values.achieved)
            // .attr("transform", "translate(700, 0)")

        numbersG
            .append("text")
            .text(d.values.target)
            .attr("transform", "translate(50, 0)")
    })
}

const cardComponent = selection => {
    // if (selection.select("*").empty()) {
        selection.each(function (d, i) {
            const cardG = d3.select(this)
                .attr("transform", `translate(0, ${i * height})`)

            cardG
                .append("rect")
                .attr("height", height)
                .attr("width", width)
                .attr("fill", "transparent")
                .attr("stroke", "red")
                .attr("stroke-width", "1px")

            const kpiContainer = cardG
                .selectAll("g")
                .data([d.kpiValues])
                .join("g")
                .attr("class", "kpis-container")

            kpiContainer
                .selectAll("g.kpi")
                .data(d.kpiValues)
                .join(
                    enter => {
                        return enter
                            .append("g")
                            .attr("class", "kpi")
                    },
                    update => update
                )
                .call(kpiComponent)
        })
    // }
}

const KPIs = () => {
    const parsedData = kpisLayout(data)
    console.log(parsedData)
    useEffect(() => {
        const svg = d3.select(".container")
            .append("svg")
            .style("height", 9999)
            .style("width", "90vw")
            // .style("border", "1px solid green")

        svg
            .selectAll("g.card")
            .data(parsedData.profiles)
            .join(
                enter => {
                    return enter
                        .append("g")
                        .attr("class", "card")
                },
                update => update
            )
            .call(cardComponent)
    }, [])

    return (
        <div className="container" />
    )
}

export default KPIs