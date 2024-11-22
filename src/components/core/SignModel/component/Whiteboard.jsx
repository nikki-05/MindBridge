import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Text } from 'react-konva';

const Whiteboard = () => {
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#000000');
    const [thickness, setThickness] = useState(5);
    const [elements, setElements] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentElement, setCurrentElement] = useState(null);

    const startDrawing = (event) => {
        const pos = event.target.getStage().getPointerPosition();
        setIsDrawing(true);

        if (tool === 'pen') {
            const newLine = {
                tool: 'pen',
                points: [pos.x, pos.y],
                stroke: color,
                strokeWidth: thickness,
            };
            setCurrentElement(newLine);
        } else if (tool === 'rectangle') {
            const newRect = {
                tool: 'rectangle',
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                stroke: color,
                strokeWidth: thickness,
            };
            setCurrentElement(newRect);
        } else if (tool === 'circle') {
            const newCircle = {
                tool: 'circle',
                x: pos.x,
                y: pos.y,
                radius: 0,
                stroke: color,
                strokeWidth: thickness,
            };
            setCurrentElement(newCircle);
        }
    };

    const draw = (event) => {
        if (!isDrawing) return;

        const pos = event.target.getStage().getPointerPosition();
        if (tool === 'pen') {
            const updatedLine = {
                ...currentElement,
                points: [...currentElement.points, pos.x, pos.y],
            };
            setCurrentElement(updatedLine);
        } else if (tool === 'rectangle') {
            const updatedRect = {
                ...currentElement,
                width: pos.x - currentElement.x,
                height: pos.y - currentElement.y,
            };
            setCurrentElement(updatedRect);
        } else if (tool === 'circle') {
            const radius = Math.sqrt(
                Math.pow(pos.x - currentElement.x, 2) +
                Math.pow(pos.y - currentElement.y, 2)
            );
            const updatedCircle = {
                ...currentElement,
                radius: radius,
            };
            setCurrentElement(updatedCircle);
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        setElements([...elements, currentElement]);
        setCurrentElement(null);
    };

    const clearCanvas = () => {
        setElements([]);
    };

    const addText = () => {
        const text = prompt('Enter text:');
        if (text) {
            const newText = {
                tool: 'text',
                text: text,
                x: 100,
                y: 100,
                fontSize: thickness * 4,
                fill: color,
            };
            setElements([...elements, newText]);
        }
    };

    return (
        <div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                style={{ border: '1px solid #ccc' }}
            >
                <Layer>
                    {elements.map((element, i) => {
                        if (element.tool === 'pen') {
                            return (
                                <Line
                                    key={i}
                                    points={element.points}
                                    stroke={element.stroke}
                                    strokeWidth={element.strokeWidth}
                                    tension={0.5}
                                    lineCap="round"
                                />
                            );
                        } else if (element.tool === 'rectangle') {
                            return (
                                <Rect
                                    key={i}
                                    x={element.x}
                                    y={element.y}
                                    width={element.width}
                                    height={element.height}
                                    stroke={element.stroke}
                                    strokeWidth={element.strokeWidth}
                                />
                            );
                        } else if (element.tool === 'circle') {
                            return (
                                <Circle
                                    key={i}
                                    x={element.x}
                                    y={element.y}
                                    radius={element.radius}
                                    stroke={element.stroke}
                                    strokeWidth={element.strokeWidth}
                                />
                            );
                        } else if (element.tool === 'text') {
                            return (
                                <Text
                                    key={i}
                                    text={element.text}
                                    x={element.x}
                                    y={element.y}
                                    fontSize={element.fontSize}
                                    fill={element.fill}
                                />
                            );
                        }
                        return null;
                    })}
                    {currentElement &&
                        (currentElement.tool === 'pen' ? (
                            <Line
                                points={currentElement.points}
                                stroke={currentElement.stroke}
                                strokeWidth={currentElement.strokeWidth}
                                tension={0.5}
                                lineCap="round"
                            />
                        ) : currentElement.tool === 'rectangle' ? (
                            <Rect
                                x={currentElement.x}
                                y={currentElement.y}
                                width={currentElement.width}
                                height={currentElement.height}
                                stroke={currentElement.stroke}
                                strokeWidth={currentElement.strokeWidth}
                            />
                        ) : currentElement.tool === 'circle' ? (
                            <Circle
                                x={currentElement.x}
                                y={currentElement.y}
                                radius={currentElement.radius}
                                stroke={currentElement.stroke}
                                strokeWidth={currentElement.strokeWidth}
                            />
                        ) : null)}
                </Layer>
            </Stage>
            <div style={{marginTop: '10px'}}>
                <button style={{margin: '8px', padding: '2px'}} onClick={clearCanvas}>Clear</button>
                <button style={{margin: '8px', padding: '2px'}} onClick={() => setTool('pen')}>Pen</button>
                <button style={{margin: '8px', padding: '2px'}} onClick={() => setTool('rectangle')}>Rectangle</button>
                <button style={{margin: '8px', padding: '2px'}} onClick={() => setTool('circle')}>Circle</button>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={thickness}
                    onChange={(e) => setThickness(parseInt(e.target.value))}
                />
                <button onClick={addText}>Add Text</button>
            </div>
        </div>
    );
};

export default Whiteboard;
