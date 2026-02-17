import { useEffect, useRef } from 'react';

export interface PythagoreanVisualizationProps {
    sideA: number;
    sideB: number;
}

/**
 * Pythagorean Visualization
 *
 * Displays a right triangle with squares on each side
 * The user can see how the squares on the two legs
 * combine to equal the square on the hypotenuse
 */
export const PythagoreanVisualization = ({ sideA, sideB }: PythagoreanVisualizationProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvas setup
        const width = 400;
        const height = 400;
        canvas.width = width;
        canvas.height = height;

        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Scale factor for visualization (pixels per unit)
        const scale = 30;

        // Starting position
        const startX = 80;
        const startY = 300;

        // Calculate positions
        const legAEnd = { x: startX + sideA * scale, y: startY };
        const legBEnd = { x: startX, y: startY - sideB * scale };
        const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);

        // Draw square on side A (blue)
        ctx.fillStyle = '#3B82F6';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(legAEnd.x, legAEnd.y, sideA * scale, sideA * scale);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.strokeRect(legAEnd.x, legAEnd.y, sideA * scale, sideA * scale);

        // Draw square on side B (green)
        ctx.fillStyle = '#10B981';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(startX - sideB * scale, legBEnd.y - sideB * scale, sideB * scale, sideB * scale);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX - sideB * scale, legBEnd.y - sideB * scale, sideB * scale, sideB * scale);

        // Draw the right triangle
        ctx.strokeStyle = '#1F2937';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(legAEnd.x, legAEnd.y);
        ctx.lineTo(legBEnd.x, legBEnd.y);
        ctx.closePath();
        ctx.stroke();

        // Draw right angle marker
        const markerSize = 15;
        ctx.strokeStyle = '#1F2937';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX + markerSize, startY);
        ctx.lineTo(startX + markerSize, startY - markerSize);
        ctx.lineTo(startX, startY - markerSize);
        ctx.stroke();

        // Draw square on hypotenuse (red)
        // We need to rotate this square
        const hypotenuseLength = hypotenuse * scale;
        const angle = Math.atan2(-sideB, sideA);

        ctx.save();
        ctx.translate(legAEnd.x, legAEnd.y);
        ctx.rotate(angle);

        ctx.fillStyle = '#EF4444';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, hypotenuseLength, hypotenuseLength);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, hypotenuseLength, hypotenuseLength);

        ctx.restore();

        // Draw labels for sides
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';

        // Label side A
        ctx.fillText(`a = ${sideA.toFixed(1)}`, startX + (sideA * scale) / 2, startY + 25);

        // Label side B
        ctx.fillText(`b = ${sideB.toFixed(1)}`, startX - 30, startY - (sideB * scale) / 2);

        // Label hypotenuse
        const hypMidX = startX + (legAEnd.x - startX) / 2 - sideB * scale / 4;
        const hypMidY = startY - (startY - legBEnd.y) / 2 - sideA * scale / 4;
        ctx.fillText(`c = ${hypotenuse.toFixed(2)}`, hypMidX, hypMidY - 15);

        // Draw legend
        ctx.font = 'normal 12px sans-serif';
        ctx.textAlign = 'left';

        // Area labels
        const areaA = sideA * sideA;
        const areaB = sideB * sideB;
        const areaC = hypotenuse * hypotenuse;

        ctx.fillStyle = '#3B82F6';
        ctx.fillText(`Area of a² = ${areaA.toFixed(2)}`, 20, 30);

        ctx.fillStyle = '#10B981';
        ctx.fillText(`Area of b² = ${areaB.toFixed(2)}`, 20, 50);

        ctx.fillStyle = '#EF4444';
        ctx.fillText(`Area of c² = ${areaC.toFixed(2)}`, 20, 70);

        // Show the equation
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(`a² + b² = c²`, 20, 95);
        ctx.font = 'normal 12px sans-serif';
        ctx.fillText(`${areaA.toFixed(2)} + ${areaB.toFixed(2)} = ${areaC.toFixed(2)}`, 20, 110);

    }, [sideA, sideB]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <canvas
                ref={canvasRef}
                className="border border-gray-200 rounded-lg bg-white shadow-sm"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>
    );
};

export default PythagoreanVisualization;
