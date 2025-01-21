export const gen01render = (
   ctx: CanvasRenderingContext2D,
   width: number,
   height: number,
   params: { frequency: number },
) => {
    const {frequency} = params
    const step = 3 // spacing between lines
    const centerX = width / 2
    const centerY = height / 2
    const baseAmplitude = 10
    ctx.lineWidth = 2

    // draw horizontal and vertical layers with more pronounced differences
    for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 0.01 // increase offset for more separation
        const layerAmplitude = baseAmplitude * ( 1 + layer * 0.5 ) // scale amplitude per layer

        // horizontal lines from center
        for (let offset = 0; offset <= Math.max(width, height); offset += step) {
            const curveOffset = Math.sin(( frequency + layerOffset ) * offset) * layerAmplitude
            const lineLength = ( 1 - Math.abs(curveOffset / layerAmplitude) ) * width

            const xStart = Math.max(( width - lineLength ) / 2, 0)
            const xEnd = Math.min(( width + lineLength ) / 2, width)

            ctx.strokeStyle = `rgba(128, 0, 128, ${( 1 - Math.abs(curveOffset / layerAmplitude) ).toFixed(2)})`

            // top line
            ctx.beginPath()
            ctx.moveTo(xStart, centerY - offset)
            ctx.lineTo(xEnd, centerY - offset)
            ctx.stroke()

            // bottom line
            ctx.beginPath()
            ctx.moveTo(xStart, centerY + offset)
            ctx.lineTo(xEnd, centerY + offset)
            ctx.stroke()
        }

        // vertical lines from center
        for (let offset = 0; offset <= Math.max(width, height); offset += step) {
            const curveOffset = Math.sin(( frequency + layerOffset ) * offset) * layerAmplitude
            const lineLength = ( 1 - Math.abs(curveOffset / layerAmplitude) ) * height

            const yStart = Math.max(( height - lineLength ) / 2, 0)
            const yEnd = Math.min(( height + lineLength ) / 2, height)

            ctx.strokeStyle = `rgba(128, 0, 128, ${( 1 - Math.abs(curveOffset / layerAmplitude) ).toFixed(2)})`

            // left line
            ctx.beginPath()
            ctx.moveTo(centerX - offset, yStart)
            ctx.lineTo(centerX - offset, yEnd)
            ctx.stroke()

            // right line
            ctx.beginPath()
            ctx.moveTo(centerX + offset, yStart)
            ctx.lineTo(centerX + offset, yEnd)
            ctx.stroke()
        }
    }
}
