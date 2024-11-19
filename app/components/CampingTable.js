'use client'
import React, { useState, useCallback, useEffect } from 'react';



const data = {
  "nom": "tableCamping",
  "steps": [
    {
      "text": "Make two tripods and plant them in the ground for maximum stability.",
      "circles": [
        { "x": 371.14423, "y": 253.61617, "type": "BrelBigue", "relatedPaths": [1, 2, 3] },
        { "x": 1163.6213, "y": 151.3161, "type": "BrelBigue", "relatedPaths": [4, 5, 6] }
      ],
      "paths": [
        { "id": 1, "d": "M 159.78297,755.43351 439.76092,109.37191", "diam": 25, "long": 200 },
        { "id": 2, "d": "M 614.44668,906.42256 315.63577,99.856453", "diam": 25, "long": 200 },
        { "id": 3, "d": "M 198.63026,908.29059 414.65452,91.359", "diam": 25, "long": 200 },
        { "id": 4, "d": "M 1362.1385,732.16096 1122.8566,20.083705", "diam": 25, "long": 200 },
        { "id": 5, "d": "M 897.13206,618.17849 1218.6933,35.010834", "diam": 25, "long": 200 },
        { "id": 6, "d": "M 1466.3279,536.26689 1086.3173,55.22003", "diam": 25, "long": 200 }
      ],
      "platelage": []
    },
    {
      "text": "Reinforce the tripods with beams, the upper ones will support the table planks, the lower ones the bench.",
      "circles": [
        { "x": 199.84525, "y": 664.67249, "type": "BrelDiag", "relatedPaths": [1, 9] },
        { "x": 249.65952, "y": 534.29163, "type": "BrelDiag", "relatedPaths": [1, 8] },
        { "x": 508.97916, "y": 609.72369, "type": "BrelDiag", "relatedPaths": [2, 8] },
        { "x": 564.93799, "y": 774.55505, "type": "BrelDiag", "relatedPaths": [2, 9] },
        { "x": 949.61066, "y": 520.20587, "type": "BrelDiag", "relatedPaths": [5, 10] },
        { "x": 1000.5512, "y": 418.28799, "type": "BrelDiag", "relatedPaths": [5, 11] },
        { "x": 1279.0327, "y": 477.03848, "type": "BrelDiag", "relatedPaths": [11, 4] },
        { "x": 1316.9911, "y": 609.16724, "type": "BrelDiag", "relatedPaths": [10, 4] }
      ],
      "paths": [
        { "id": 8, "d": "M 227.30355,519.85561 630.55051,642.6073", "diam": 25, "long": 140 },
        { "id": 9, "d": "M 69.739919,623.05182 747.04359,829.36419", "diam": 25, "long": 200 },
        { "id": 10, "d": "M 1521.0449,648.6259 724.4788,476.65562", "diam": 25, "long": 200 },
        { "id": 11, "d": "M 1411.5901,500.23016 950.88652,408.43136", "diam": 25, "long": 140 }
      ],
      "platelage": []
    },
    {
      "text": "Connect the tripods together, these beams will serve as support for the table planking.",
      "circles": [
        { "x": 334.72266, "y": 558.35675, "type": "BrelCar", "relatedPaths": [8, 13] },
        { "x": 558.10754, "y": 614.65045, "type": "BrelCar", "relatedPaths": [8, 12] },
        { "x": 1003.6112, "y": 417.98947, "type": "BrelCar", "relatedPaths": [11, 13] },
        { "x": 1257.4105, "y": 474.34088, "type": "BrelCar", "relatedPaths": [11, 12] }
      ],
      "paths": [
        { "id": 12, "d": "M 423.3883,649.63566 1324.9302,444.76295", "diam": 25, "long": 280 },
        { "id": 13, "d": "M 200.61972,581.9113 1097.7826,390.74542", "diam": 25, "long": 280 }
      ],
      "platelage": []
    },
    {
      "text": "Connect the lower beams of each tripod with two (or more) beams, these will form the bench.",
      "circles": [
        { "x": 128.35039, "y": 633.61041, "type": "BrelCar", "relatedPaths": [9, 16] },
        { "x": 181.91988, "y": 670.64484, "type": "BrelCar", "relatedPaths": [9, 17] },
        { "x": 563.89532, "y": 764.52344, "type": "BrelCar", "relatedPaths": [9, 14] },
        { "x": 613.87769, "y": 800.97253, "type": "BrelCar", "relatedPaths": [9, 15] },
        { "x": 782.6051, "y": 481.75424, "type": "BrelCar", "relatedPaths": [10, 16] },
        { "x": 850.07178, "y": 512.61127, "type": "BrelCar", "relatedPaths": [10, 17] },
        { "x": 1371.454, "y": 607.52234, "type": "BrelCar", "relatedPaths": [10, 14] },
        { "x": 1476.2928, "y": 646.06403, "type": "BrelCar", "relatedPaths": [10, 15] }
      ],
      "paths": [
        { "id": 14, "d": "M 476.09612,819.03657 1515.0463,591.28914", "diam": 25, "long": 300 },
        { "id": 15, "d": "M 534.86259,840.53166 1596.1576,610.49469", "diam": 25, "long": 300 },
        { "id": 16, "d": "M 53.453686,654.7345 1112.3092,414.87985", "diam": 25, "long": 300 },
        { "id": 17, "d": "M 104.89181,673.49017 1201.5987,427.94684", "diam": 25, "long": 300 }
      ],
      "platelage": []
    },
    {
      "text": "Make planking on the two upper beams to complete your camping table.",
      "circles": [],
      "paths": [],
      "platelage": [
        { "d": "M 334.72266,558.35675 558.10754,614.65045  1257.4105,474.34088 1003.6112,417.98947 334.72266,558.35675", "relatedPaths": [13, 12] }
      ]
    }
  ]
};







const CampingTable = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedPaths, setClickedPaths] = useState([]);
  const [units, setUnits] = useState('cm');
  const [groupedPaths, setGroupedPaths] = useState([]);
  const [circleCount, setCircleCount] = useState(0);

  const colors = {
    boisClicked: '#e18000',
    boisInactive: '#8b632e',
    boisClickable: '#b6741e',
    orange: '#ffc107',
    blanc: '#FFFFFF',
    rouge: '#EE4B6A',
    rougeA: '#FF5714',
    link: '#69d4ff',
  };

  const InventoryModal = ({ items, isOpen, onClose }) => {
    if (!isOpen) return null; // Return null if modal is closed

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-[#0b382c] p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl text-gray-200 text-center font-bold mb-4">Inventory</h2>

          {/* Inventory list */}
          <div >
            {items.map((item, index) => (
              <div key={index} className="mb-2 text-gray-200 flex justify-evenly">
                {/* Display the 'long' parameter */}
                <span>{convertCmToFeetAndInches(item.long)} </span>

                <div className='w-3/4 mx-2 text-xl bg-white rounded-lg'>
                  <span>{'🪵'.repeat(item.count)} </span>
                </div>
                {/* Display the 'count' parameter */}
                <span>X {item.count}</span>
              </div>
            ))}
          </div>

          <div className='justify-center flex items-center w-full'>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white justify-center rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  function convertCmToFeetAndInches(valueInCm) {

    if (isNaN(valueInCm)) {
      return '...';
    }

    if (units === 'ft') {
      const cmPerInch = 2.54;
      const inchesPerFoot = 12;

      // Convert cm to total inches
      let totalInches = valueInCm / cmPerInch;

      // Calculate feet and remaining inches
      let feet = Math.floor(totalInches / inchesPerFoot);
      let inches = Math.floor(totalInches % inchesPerFoot);
      return `${feet}' ${inches}''`;
    } else {
      // If the locale is French (or any other language that uses cm), return the value in cm
      return `${valueInCm} cm`;
    }
  }

  const LashColor = (circleType) => {
    switch (circleType) {
      case "BrelBigue":
        return colors.orange;
      case "BrelCar":
        return colors.blanc;
      case "BrelDiag":
        return colors.rouge;
      case "BrelInv":
        return colors.rougeA;
      case "BrelLong":
        return colors.link;
      default:
        return "red";
    }
  };

  const LashType = (circleType) => {
    switch (circleType) {
      case "BrelBigue":
        return "Tripod Lashing";
      case "BrelCar":
        return "Square Lashing";
      case "BrelDiag":
        return "Diagonal Lashing";
      case "BrelInv":
        return "Tripod Lashing";
      case "BrelLong":
        return "Shear Lashing";
      default:
        return "red";
    }
  };

  const handleItemClick = (item) => {
    setClickedPaths([]);
    setClickedPaths((prevClickedPaths) => {
      // Check if the item is already clicked to avoid duplicates
      if (prevClickedPaths.includes(item.id)) {
        return prevClickedPaths; // If already clicked, return the current state
      }
      return [...prevClickedPaths, item.id]; // Add new clicked item to the array
    });

    setSelectedItem(item);



    if (item.relatedPaths) {
      setClickedPaths(item.relatedPaths);
    }
  };

  const openModal = () => {
    setModalOpen(true);
    setClickedPaths([]);
  };
  const closeModal = () => {
    setModalOpen(false);
    setClickedPaths([]);
  };


  const isPathFromCurrentStep = useCallback((path) => {
    return data.steps[currentStep].paths.some(p => p.id === path.id);
  }, [currentStep]);

  const getPathColor = useCallback((path) => {
    if (clickedPaths.includes(path.id)) {
      return colors.boisClicked;
    }
    if (isPathFromCurrentStep(path)) {
      return colors.boisClickable;
    }
    return colors.boisInactive;
  }, [clickedPaths, currentStep, isPathFromCurrentStep]);

  const renderPaths = () => {
    const allPaths = data.steps.slice(0, currentStep + 1).flatMap(step => step.paths);
    return allPaths.map(path => (
      <path
        key={path.id}
        d={path.d}
        opacity={.85}
        stroke={getPathColor(path)}
        strokeWidth={30}
        fill="none"
        onClick={() => isPathFromCurrentStep(path) && handleItemClick(path)}
        style={{ cursor: isPathFromCurrentStep(path) ? 'pointer' : 'default' }}
        strokeLinecap='round'
      />
    ));
  };

  const renderCircles = () => {
    return data.steps[currentStep].circles.map((circle, index) => (
      <circle
        key={index}
        cx={circle.x}
        cy={circle.y}
        r={30}
        fill={LashColor(circle.type)}
        onClick={() => handleItemClick(circle)}
        style={{ cursor: 'pointer' }}
      />
    ));
  };

  const renderPlatelage = () => {
    return data.steps[currentStep].platelage.map((plate, index) => (
      <path
        key={index}
        d={plate.d}
        fill={colors.boisClickable}
        stroke={colors.boisClickable}
        strokeWidth={30}
        onClick={() => handleItemClick(plate)}


      />
    ));
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
    setClickedPaths([]);
    setSelectedItem(null);
  };



  const unitChange = (e) => {
    setUnits(e.target.value);
    console.log(units);
  };

  const processData = (data) => {
    // Initialize an empty object for grouping paths by 'long'
    const pathGroups = {};

    // Initialize circle count
    let circleCount = 0;

    // Iterate over each step
    data.steps.forEach(step => {
      // Count circles
      circleCount += step.circles.length;

      // Iterate over paths and group by 'long'
      step.paths.forEach(path => {
        if (pathGroups[path.long]) {
          pathGroups[path.long]++;
        } else {
          pathGroups[path.long] = 1;
        }
      });
    });

    // Convert pathGroups object to an array and sort by 'long'
    const groupedPaths = Object.keys(pathGroups)
      .map(key => ({ long: Number(key), count: pathGroups[key] }))
      .sort((a, b) => a.long - b.long);

    return { groupedPaths, circleCount };
  };

  useEffect(() => {
    const { groupedPaths, circleCount } = processData(data);
    setGroupedPaths(groupedPaths);
    setCircleCount(circleCount);
    console.log(circleCount);
  }, [data]);


  return (

    <div className="flex flex-col items-center justify-evenly min-h-screen bg-[#0b382c]  rounded-lg">
      <p className='text-xl mt-2 text-bold text-center text-white'>Camping Table</p>
      <svg viewBox="0 0 1650 1000" className=' h-[30vh] lg:h-[40vh]'>

        {renderPaths()}
        {renderCircles()}
        {renderPlatelage()}
      </svg>

      <div className=" text-white h-[8vh] w-[90vw] max-w-[500px] flex justify-center items-center">

        {selectedItem ? (
          <div className='justify-center text-center items-center w-full'>
            {selectedItem.id ? ( // Check if it's a path (has id)
              <>
                <p >Woodbeam : {convertCmToFeetAndInches(selectedItem.long)} </p>
              </>
            ) : selectedItem.d && selectedItem.d.split(' ').length > 1 ? ( // Check if d attribute has more than one space
              <>
                <p >Planking</p>
              </>
            ) : ( // If not, it must be a circle
              <>
                <p >{LashType(selectedItem.type)}</p>
              </>
            )}
          </div>
        ) : (
          <div>
            <p>Click on the elements to get more information</p>

          </div>
        )}
      </div>




      <div className=" flex justify-between items-center">
        <button
          onClick={() => handleStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 border-2 border-white rounded-full text-white  disabled:bg-gray-300"
        >
          Prev
        </button>
        <div className=" text-center">
          <span className="text-xl text-[#FFC107] mx-4  rounded-full px-4 py-2">{currentStep + 1}</span>
        </div>
        <button
          onClick={() => handleStepChange(Math.min(data.steps.length - 1, currentStep + 1))}
          disabled={currentStep === data.steps.length - 1}
          className="px-4 py-2 border-2 border-white rounded-full text-white  disabled:bg-gray-300"
        >
          Next
        </button>
      </div>




      <div className="bg-gray-200 p-4 w-[calc(5*4rem+4*1rem)] h-[15vh] text-center flex justify-center items-center rounded-lg">
        <span className={` text-[#0b382c]`}>{data.steps[currentStep].text}</span>
      </div>


      <div className='text-white w-[calc(5*4rem+4*1rem)] flex justify-evenly'>
        <label>
          <input
            type="radio"
            value="cm"
            checked={units === 'cm'}
            onChange={unitChange}
            className='mr-2'

          />
          Centimeter
        </label>

        <label>
          <input
            type="radio"
            value="ft"
            checked={units === 'ft'}
            onChange={unitChange}
            className='mr-2'
          />
          Feet and Inches
        </label>


      </div>
      <div className='flex justify-center items-center'>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={openModal}
        >
          Inventory
        </button>
      </div>
      <InventoryModal items={groupedPaths} isOpen={modalOpen} onClose={closeModal} />

    </div>

  );
};

export default CampingTable;