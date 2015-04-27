/*eslint-disable no-extend-native */
  Array.prototype.flatMap = function(lambda) {
      return Array.prototype.concat.apply([], this.map(lambda));
  };

  Array.prototype.multiSort = function(fieldDefs, sortDefs) {
      	var fieldIndex ={},
      		c=0;
    	for (var key in fieldDefs) {
    		fieldIndex[key] = c;
    		c++;
    	}
    	return this.sort(function(a,b){
		    for(var i=0; i<sortDefs.length; i++){
		    	var index = fieldIndex[sortDefs[i].field];
		        var retval = a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0;
		        if (sortDefs[i].order == "desc") {
		            retval = retval * -1;
		        }
		        if (retval !== 0) {
		            return retval;
		        }
		    }
		});
  };

/*eslint-enable no-extend-native */
