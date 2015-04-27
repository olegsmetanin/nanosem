import assert from 'assert';
import './../../src/webclient/assets/js/apps/fluxtable/utils/Array.js';

describe('multicolumn sort', () => {

    it('is working', () => {

    	var dataArray = [[4, 5, 6],[1, 2, 3],[7, 8, 9],[7, 9, 0]];
    	var fieldDefs={'n1':'n1', 'n2':'n2', 'n3':'n3'};

    	var sortDefs = [];
    	assert.deepEqual(dataArray.slice(0).multiSort(fieldDefs,sortDefs),[[4, 5, 6],[1, 2, 3],[7, 8, 9],[7, 9, 0]]);

    	var sortDefs = [{field:'n3', order:'asc'}];
    	assert.deepEqual(dataArray.slice(0).multiSort(fieldDefs,sortDefs),[[7, 9, 0], [1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    	var sortDefs = [{field:'n1', order:'asc'}, {field:'n2', order:'desc'}];
    	assert.deepEqual(dataArray.slice(0).multiSort(fieldDefs,sortDefs),[[1, 2, 3], [4, 5, 6], [7, 9, 0], [7, 8, 9]]);

    });

});