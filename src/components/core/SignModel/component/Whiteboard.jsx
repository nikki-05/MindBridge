import React, { useState, useRef, useEffect } from 'react'; 
import '../component/whiteboard.css';

const Whiteboard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#000000');
    const [thickness, setThickness] = useState(5);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 100;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = thickness;
        contextRef.current = context;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 100;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [color, thickness]);

    const getCoordinates = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        };
    };

    const startDrawing = ({ nativeEvent }) => {
        const { x, y } = getCoordinates(nativeEvent);
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
        setStartPos({ x, y });
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const { x, y } = getCoordinates(event);
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

        // Redraw existing shapes if needed (not implemented here)
        
        if (tool === 'pen' || tool === 'eraser') {
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
        } else if (tool === 'rectangle') {
            drawRectangle(contextRef.current, startPos.x, startPos.y, x, y);
        } else if (tool === 'circle') {
            drawCircle(contextRef.current, startPos.x, startPos.y, x, y);
        }
    };

    const drawRectangle = (context, startX, startY, endX, endY) => {
        context.beginPath();
        context.rect(startX, startY, endX - startX, endY - startY);
        context.stroke();
    };

    const drawCircle = (context, startX, startY, endX, endY) => {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        context.beginPath();
        context.arc(startX, startY, radius, 0, 2 * Math.PI);
        context.stroke();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

    const changeColor = (newColor) => {
        setColor(newColor);
        contextRef.current.strokeStyle = newColor;
    };

    const changeTool = (newTool) => {
        setTool(newTool);
        contextRef.current.globalCompositeOperation = newTool === 'eraser' ? 'destination-out' : 'source-over';
    };

    const changeThickness = (newThickness) => {
        setThickness(newThickness);
        contextRef.current.lineWidth = newThickness;
    };

    const addText = () => {
        const text = prompt('Enter text:');
        if (text) {
            const { x, y } = startPos; // Use start position for text placement
            contextRef.current.font = `${thickness * 2}px Arial`;
            contextRef.current.fillStyle = color;
            contextRef.current.fillText(text, x, y);
        }
    };

    return (
        <div className="whiteboard-container p-4">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <div className="controls">
                <button onClick={clearCanvas}>Clear</button>
                <button onClick={() => changeTool('pen')}>Pen</button>
                <button onClick={() => changeTool('eraser')}>Eraser</button>
                <button onClick={() => changeTool('rectangle')}>Rectangle</button>
                <button onClick={() => changeTool('circle')}>Circle</button>
                <button onClick={addText}>Add Text</button>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => changeColor(e.target.value)}
                />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={thickness}
                    onChange={(e) => changeThickness(parseInt(e.target.value))}
                />
            </div>
        </div>
    );
};

export default Whiteboard;