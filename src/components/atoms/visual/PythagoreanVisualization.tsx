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
        const width = 500;
        const height = 500;
        canvas.width = width;
        canvas.height = height;

        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Scale factor for visualization (pixels per unit)
        const scale = 35;

        // Starting position (right angle at this point)
        const startX = 150;
        const startY = 350;

        // Calculate triangle vertices
        const legAEnd = { x: startX + sideA * scale, y: startY };
        const legBEnd = { x: startX, y: startY - sideB * scale };
        const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);

        // Draw square on side A (blue) - below the triangle
        ctx.fillStyle = '#3B82F6';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(legAEnd.x - sideA * scale, legAEnd.y, sideA * scale, sideA * scale);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.strokeRect(legAEnd.x - sideA * scale, legAEnd.y, sideA * scale, sideA * scale);

        // Draw square on side B (green) - to the left of the triangle
        ctx.fillStyle = '#10B981';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(startX - sideB * scale, startY - sideB * scale, sideB * scale, sideB * scale);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX - sideB * scale, startY - sideB * scale, sideB * scale, sideB * scale);

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
        const markerSize = 12;
        ctx.strokeStyle = '#1F2937';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX + markerSize, startY);
        ctx.lineTo(startX + markerSize, startY - markerSize);
        ctx.lineTo(startX, startY - markerSize);
        ctx.stroke();

        // Draw square on hypotenuse (red)
        // Calculate the vector along the hypotenuse
        const hypotenuseLength = hypotenuse * scale;
        const angle = Math.atan2(legBEnd.y - legAEnd.y, legBEnd.x - legAEnd.x);

        // Calculate the perpendicular vector (normal to hypotenuse)
        const normalAngle = angle + Math.PI / 2;
        const normalX = Math.cos(normalAngle);
        const normalY = Math.sin(normalAngle);

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
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';

        // Label side A
        ctx.fillText(`a = ${sideA.toFixed(1)}`, startX + (sideA * scale) / 2, startY + 30);

        // Label side B
        ctx.fillText(`b = ${sideB.toFixed(1)}`, startX - 35, startY - (sideB * scale) / 2);

        // Label hypotenuse
        const hypMidX = startX + (legAEnd.x - startX) / 2 + 20;
        const hypMidY = startY - (startY - legBEnd.y) / 2 - 15;
        ctx.fillText(`c = ${hypotenuse.toFixed(2)}`, hypMidX, hypMidY);

        // Draw legend at top
        ctx.font = 'normal 11px sans-serif';
        ctx.textAlign = 'left';

        // Area labels
        const areaA = sideA * sideA;
        const areaB = sideB * sideB;
        const areaC = hypotenuse * hypotenuse;

        ctx.fillStyle = '#3B82F6';
        ctx.fillText(`Area of a² = ${areaA.toFixed(2)}`, 20, 20);

        ctx.fillStyle = '#10B981';
        ctx.fillText(`Area of b² = ${areaB.toFixed(2)}`, 20, 36);

        ctx.fillStyle = '#EF4444';
        ctx.fillText(`Area of c² = ${areaC.toFixed(2)}`, 20, 52);

        // Show the equation
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`a² + b² = c²`, 20, 72);
        ctx.font = 'normal 11px sans-serif';
        ctx.fillText(`${areaA.toFixed(2)} + ${areaB.toFixed(2)} = ${areaC.toFixed(2)}`, 20, 86);

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
