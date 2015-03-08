Polymer("core-selector",{selected:null,multi:false,valueattr:"name",selectedClass:"core-selected",selectedProperty:"",selectedAttribute:"active",selectedItem:null,selectedModel:null,selectedIndex:-1,excludedLocalNames:"",target:null,itemsSelector:"",activateEvent:"tap",notap:false,defaultExcludedLocalNames:"template",observe:{"selected multi":"selectedChanged"},ready:function(){this.activateListener=this.activateHandler.bind(this);this.itemFilter=this.filterItem.bind(this);this.excludedLocalNamesChanged();this.observer=new MutationObserver(this.updateSelected.bind(this));if(!this.target){this.target=this}},get items(){if(!this.target){return[]}var nodes=this.target!==this?this.itemsSelector?this.target.querySelectorAll(this.itemsSelector):this.target.children:this.$.items.getDistributedNodes();return Array.prototype.filter.call(nodes,this.itemFilter)},filterItem:function(node){return!this._excludedNames[node.localName]},excludedLocalNamesChanged:function(){this._excludedNames={};var s=this.defaultExcludedLocalNames;if(this.excludedLocalNames){s+=" "+this.excludedLocalNames}s.split(/\s+/g).forEach(function(n){this._excludedNames[n]=1},this)},targetChanged:function(old){if(old){this.removeListener(old);this.observer.disconnect();this.clearSelection()}if(this.target){this.addListener(this.target);this.observer.observe(this.target,{childList:true});this.updateSelected()}},addListener:function(node){Polymer.addEventListener(node,this.activateEvent,this.activateListener)},removeListener:function(node){Polymer.removeEventListener(node,this.activateEvent,this.activateListener)},get selection(){return this.$.selection.getSelection()},selectedChanged:function(){if(arguments.length===1){this.processSplices(arguments[0])}else{this.updateSelected()}},updateSelected:function(){this.validateSelected();if(this.multi){this.clearSelection(this.selected);this.selected&&this.selected.forEach(function(s){this.setValueSelected(s,true)},this)}else{this.valueToSelection(this.selected)}},validateSelected:function(){if(this.multi&&!Array.isArray(this.selected)&&this.selected!=null){this.selected=[this.selected]}else if(!this.multi&&Array.isArray(this.selected)){var s=this.selected[0];this.clearSelection([s]);this.selected=s}},processSplices:function(splices){for(var i=0,splice;splice=splices[i];i++){for(var j=0;j<splice.removed.length;j++){this.setValueSelected(splice.removed[j],false)}for(var j=0;j<splice.addedCount;j++){this.setValueSelected(this.selected[splice.index+j],true)}}},clearSelection:function(excludes){this.$.selection.selection.slice().forEach(function(item){var v=this.valueForNode(item)||this.items.indexOf(item);if(!excludes||excludes.indexOf(v)<0){this.$.selection.setItemSelected(item,false)}},this)},valueToSelection:function(value){var item=this.valueToItem(value);this.$.selection.select(item)},setValueSelected:function(value,isSelected){var item=this.valueToItem(value);if(isSelected^this.$.selection.isSelected(item)){this.$.selection.setItemSelected(item,isSelected)}},updateSelectedItem:function(){this.selectedItem=this.selection},selectedItemChanged:function(){if(this.selectedItem){var t=this.selectedItem.templateInstance;this.selectedModel=t?t.model:undefined}else{this.selectedModel=null}this.selectedIndex=this.selectedItem?parseInt(this.valueToIndex(this.selected)):-1},valueToItem:function(value){return value===null||value===undefined?null:this.items[this.valueToIndex(value)]},valueToIndex:function(value){for(var i=0,items=this.items,c;c=items[i];i++){if(this.valueForNode(c)==value){return i}}return value},valueForNode:function(node){return node[this.valueattr]||node.getAttribute(this.valueattr)},selectionSelect:function(e,detail){this.updateSelectedItem();if(detail.item){this.applySelection(detail.item,detail.isSelected)}},applySelection:function(item,isSelected){if(this.selectedClass){item.classList.toggle(this.selectedClass,isSelected)}if(this.selectedProperty){item[this.selectedProperty]=isSelected}if(this.selectedAttribute&&item.setAttribute){if(isSelected){item.setAttribute(this.selectedAttribute,"")}else{item.removeAttribute(this.selectedAttribute)}}},activateHandler:function(e){if(!this.notap){var i=this.findDistributedTarget(e.target,this.items);if(i>=0){var item=this.items[i];var s=this.valueForNode(item)||i;if(this.multi){if(this.selected){this.addRemoveSelected(s)}else{this.selected=[s]}}else{this.selected=s}this.asyncFire("core-activate",{item:item})}}},addRemoveSelected:function(value){var i=this.selected.indexOf(value);if(i>=0){this.selected.splice(i,1)}else{this.selected.push(value)}},findDistributedTarget:function(target,nodes){while(target&&target!=this){var i=Array.prototype.indexOf.call(nodes,target);if(i>=0){return i}target=target.parentNode}},selectIndex:function(index){var item=this.items[index];if(item){this.selected=this.valueForNode(item)||index;return item}},selectPrevious:function(wrapped){var i=wrapped&&!this.selectedIndex?this.items.length-1:this.selectedIndex-1;return this.selectIndex(i)},selectNext:function(wrapped){var i=wrapped&&this.selectedIndex>=this.items.length-1?0:this.selectedIndex+1;return this.selectIndex(i)}});