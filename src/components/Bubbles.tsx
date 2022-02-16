import React, { useLayoutEffect } from 'react';
//import BubbleChart from '@weknow/react-bubble-chart-d3';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

//import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";
//import am4themes_https://cdn.amcharts.com/lib/5/Animated from "@amcharts/amcharts4/themes/https://cdn.amcharts.com/lib/5/Animated";
interface Ioptions {
  id: number;
  content: string;
}

interface IProps {
  options: Ioptions[];
}

const Bubbles = ({ options }: IProps) => {
  useLayoutEffect(() => {
    let root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    let data = {
      id: 0,
      children: options,
    };

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    );

    let series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 1,
        maxRadius: 60,
        minRadius: 20,
        valueField: 'value',
        categoryField: 'content',
        childDataField: 'children',
        manyBodyStrength: -13,
        centerStrength: 0.8,
      }),
    );

    series.data.setAll([data]);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [options]);
  return (
    <div>
      <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default Bubbles;
