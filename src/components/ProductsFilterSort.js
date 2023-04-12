import React, { useState, useEffect } from 'react';
import FancyDropdown from './FancyDropdown.js';
import { getDepositAssets, getStrategyList } from "../modules/crypto";

/**
 * A component that allows filtering and sorting of products based on deposit asset, strategy, and other criteria.
 * @param {Object} props
 * @param {Object[]} props.products - An array of product objects to be filtered and sorted.
 * @param {function} props.onFinish - A callback function to be called with the filtered and sorted products.
 * @returns {JSX.Element} - A JSX element containing the filter and sort options.
 */
const FilterSort = ({ products=[], onFinish=()=>{} }) => {
  const [isGrid, setIsGrid] = useState(true);
  const [depositAsset, setDepositAsset] = useState([{ name: "Loading assets...", disabled: true }]);
  const [strategyList, setStrategyList] = useState([{ name: "Loading strategies...", disabled: true }]);
  const [selectedDepositAssets, setSelectedDepositAssets] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [selectedSort, setSelectedSort] = useState('default sorting');

  const handleSelectStrategy = (els) => setSelectedStrategies(els);
  const handleSelectDepositAsset = (els) => setSelectedDepositAssets(els);
  const handleSelectSort = (els) => setSelectedSort(els[0]);

  const sortingElements = [
    {name:"default sorting", key:"default"},
    {name:"newest first", key:"newest"},
    {name:"oldest first", key:"oldest"},
    {name:"yield: high to low", key:"yield-high"},
    {name:"yield: low to high", key:"yield-low"},
  ];

  useEffect(() => {
    getDepositAssets().then(assets => {
      setDepositAsset(assets);
    });
    getStrategyList().then(strategyList => {
      setStrategyList(strategyList);
    });
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    if (selectedDepositAssets.length>0) {
      filteredProducts = filteredProducts.filter(product => selectedDepositAssets.includes(product.asset));
    }

    if (selectedStrategies.length>0) {
      filteredProducts = filteredProducts.filter(product => selectedStrategies.includes(product.strategy));
    }

    if (selectedSort === 'newest') {
      filteredProducts = filteredProducts.sort((a, b) => b.nrID - a.nrID);
    } else if (selectedSort === 'oldest') {
      filteredProducts = filteredProducts.sort((a, b) => a.nrID - b.nrID);
    } else if (selectedSort === 'yield-high') {
      filteredProducts = filteredProducts.sort((a, b) => b.projectedAPY - a.projectedAPY);
    } else if (selectedSort === 'yield-low') {
      filteredProducts = filteredProducts.sort((a, b) => a.projectedAPY - b.projectedAPY);
    }

    onFinish(filteredProducts);
  }, [selectedDepositAssets, selectedStrategies, selectedSort, products, onFinish]);

  return (
    <div className="d-flex align-items-center justify-content-center flex-wrap">
      <FancyDropdown deselectButton stopPropagation multipleChoice className="mx-1 my-1" icon="trophy" name="Strategy" elements={strategyList} onSelect={handleSelectStrategy} />
      <FancyDropdown deselectButton stopPropagation multipleChoice className="mx-1 my-1" icon="currency-dollar" name="Deposit asset" elements={depositAsset} onSelect={handleSelectDepositAsset} />
      <FancyDropdown nameSelected defaults={["default"]} className="mx-1 my-1" icon="sort-alpha-down" name="Sort by" elements={sortingElements} onSelect={handleSelectSort} />
      <button type="button" className="btn btn-dark mx-1 my-1 fs-4" onClick={() => setIsGrid(!isGrid)}>
        {isGrid ? <i className="bi bi-grid-3x3-gap"></i> : <i className="bi bi-card-list"></i>}
      </button>
    </div>
  );

};

export default FilterSort;
