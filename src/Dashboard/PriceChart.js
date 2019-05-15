import highchartsConfig from './HighchartsConfig';
import React from 'react';
import {Tile} from '../Shared/Tile';
import{AppContext} from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';
import HighchartsTheme from './HighchartsTheme';
import ChartSelect from './ChartSelect';
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);


export default function () {
    return (
        <AppContext.Consumer>
            {({historical}) =>
            <Tile>
                <ChartSelect>
                    <option value ='days'> Days </option>
                    <option value ='days'> Weeks </option>
                    <option value ='days'> Months </option>
                    <option value ='days'> Years </option>
                </ChartSelect>
               { historical ? <ReactHighcharts config={highchartsConfig(historical)}/>
                : <div> Loading Historical Data</div>
            } 
            </Tile>
            }
        </AppContext.Consumer>
    )
}