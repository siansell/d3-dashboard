export default {
    kpis: [
        { id: "1", name: "Press-ups", min: 0, max: 60, unit: "reps", tags: ["Upper Body"] },
        { id: "2", name: "Pull-ups", min: 0, max: 30, unit: "reps", tags: ["Upper Body"] },
        { id: "3", name: "Shoulder Press", min: 0, max: 80, unit: "kg", tags: ["Upper Body"] },
        { id: "4", name: "Sit-ups", min: 0, max: 50, unit: "reps", tags: ["Core"] },
        { id: "5", name: "Plank", min: 0, max: 90, unit: "secs", tags: ["Core"] },
        { id: "6", name: "Bridge", min: 0, max: 90, unit: "secs", tags: ["Core"] },
        { id: "7", name: "Squats", min: 0, max: 180, unit: "kg", tags: ["Lower Body"] },
        { id: "8", name: "Leg curl", min: 0, max: 60, unit: "kg", tags: ["Lower Body"] },
    ],
    profiles: [
        {
            id: "1",
            startDate: "2021-09-01T18:26:00.000+00:00",
            endDate: "2021-10-01T18:26:00.000+00:00",
            kpiValues: [
                { id: "1", values: { previous: 20, achieved: 24, target: 26 } },
                { id: "2", values: { previous: 10, achieved: 11, target: 13 } },
                { id: "3", values: { previous: 25, achieved: 29, target: 28 } },
                { id: "4", values: { previous: 22, achieved: 27, target: 28 } },
                { id: "5", values: { previous: 25, achieved: 36, target: 32 } },
                { id: "6", values: { previous: 11, achieved: 17, target: 15 } },
                { id: "7", values: { previous: 105, achieved: 112, target: 115 } },
                { id: "8", values: { previous: 45, achieved: 55, target: 55 } }
            ]
        },
        {
            id: "2",
            endDate: "2021-11-01T18:26:00.000+00:00",
            kpiValues: [
                { id: "1", values: { achieved: 27, target: 30 } },
                { id: "2", values: { achieved: 12, target: 15 } },
                { id: "3", values: { achieved: 32, target: 32 } },
                { id: "4", values: { achieved: 35, target: 34 } },
                { id: "5", values: { achieved: 43, target: 38 } },
                { id: "6", values: { achieved: 23, target: 20 } },
                { id: "7", values: { achieved: 130, target: 130 } },
                { id: "8", values: { achieved: 65, target: 65 } }
            ]
        },
        {
            id: "3",
            endDate: "2021-12-01T18:26:00.000+00:00",
            kpiValues: [
                { id: "1", values: { achieved: 28, target: 33 } },
                { id: "2", values: { achieved: 12, target: 16 } },
                { id: "3", values: { achieved: 33, target: 36 } },
                { id: "4", values: { achieved: 42, target: 40 } },
                { id: "5", values: { achieved: 50, target: 42 } },
                { id: "6", values: { achieved: 27, target: 25 } },
                { id: "7", values: { achieved: 140, target: 140 } },
                { id: "8", values: { achieved: 75, target: 70 } }
            ]
        }
    ]
}