

//import jsonData from './data'; 
const jsonData = require('./schemaRU.json');
const generateSchema = (data) => {
    const schema = {
        title: "Configuration",
        type: "object",
        properties: {}
    };

    // Function to traverse and generate schema for lists
    const listTraverse = (listData) => {
        const listSchema = {
            type: "array",
            title:"",
            items: {
                type: "object",
                properties: {}
            }
        };
        Object.keys(listData).forEach((key) => {
            const node = listData[key];
            let type ='string';
            if (node.__type === 'leaf' || node.__type === 'leaf-list') {
                if(node.__datatype === 'INT'){
                    type = 'number';
                }
                if(node.__datatype === 'STRING'){
                    type = 'string';
                }
                if (node.__datatype === 'DECIMAL' || node.__datatype === 'FLOAT' || node.__datatype === 'DOUBLE') {
                    type = 'number'; // JavaScript treats all numbers (int, float, double) as type 'number'
                }
                try
                {
                if(node["__datatype"]?.toLowerCase() === 'boolean'){
                    type = 'boolean';
                }
                }
                catch(e)
                {
                    console.log(e)
                }
                listSchema.items.properties[key] = {
                    type: type,
                    title: toPascalCase(node.__displayname),
                    readyOnly:node.__config==="true"? false:true,
                    enums : node.__enum ? node.__enum:null,
                    displayType : node.__displayType ? node.__displayType:null,
                    patterns : node.__pattern ? node.__pattern:null,
                    helperText:node.__helperText ? node.__helperText:null,
                    maxLen : node.__maxLength ? node.__maxLength:null,
                    minLen: node.__minLength ? node.__minLength:null,
                    defaultvalues: node.__defaultvalues ? node.__defaultvalues:null,
                };
            }
            else if (node.__type === 'list') {
                listSchema.items.properties[key] = listTraverse(node);
                listSchema.title=node.__displayname;
            } else if (node.__type === 'container') {
                listSchema.items.properties[key] = containerTraverse(node);
                listSchema.items["__displayname"] = node.__displayname
                listSchema.title=node.__displayname;
            }
        });
        return listSchema;
    };

    function toPascalCase(str) {
        return str?.replace(/[^a-zA-Z0-9]+/g, " ")?.split(" ")?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())?.join(" "); 
      }
    // Function to traverse and generate schema for containers
    const containerTraverse = (containerData) => {
        const containerSchema = {
            type: "object",
            title:"",
            properties: {}
        };
        Object.keys(containerData).forEach((key) => {
            const node = containerData[key];
            if (node.__type === 'leaf' || node.__type === 'leaf-list') {
                let type="string";
                if(node?.__datatype === 'INT'){
                    type = 'number';
                }
                if(node?.__datatype === 'STRING'){
                    type = 'string';
                }
                try
                {
                if(node?.__datatype?.toLowerCase() === 'boolean'){
                    type = 'boolean';
                }
                }
                catch(e)
                {
                    console.log(e)
                }
            
                containerSchema.properties[key] = {
                    type: type,
                    title: toPascalCase(node.__displayname),
                    readyOnly:node.__config==="true"? false:true,
                    enums : node.__enum ? node.__enum:null,
                    displayType : node.__displayType ? node.__displayType:null,
                    patterns : node.__pattern ? node.__pattern:null,
                    helperText:node.__helperText ? node.__helperText:null,
                    maxLen : node.__maxLength ? node.__maxLength:null,
                    minLen: node.__minLength ? node.__minLength:null,
                    defaultvalues:node.__defaultvalues ? node.__defaultvalues:null,
                };
            } else if (node.__type === 'list') {
                containerSchema.properties[key] = listTraverse(node);
                containerSchema.title= toPascalCase(node.__displayname);
            } else if (node.__type === 'container') {
                containerSchema.properties[key] = containerTraverse(node);
                containerSchema.title= toPascalCase(node.__displayname);
            }
        });
        return containerSchema;
    };

    const traverse = (obj) => {
        Object.keys(obj).forEach((key) => {
            if (key.startsWith('__')) {
                return;
            }
            const node = obj[key];
            if (node.__type === 'container') {
                schema.properties[key] = containerTraverse(node);
            } else if (node.__type === 'list') {
                schema.properties[key] = listTraverse(node);
            } else if (node.__type === 'leaf' || node.__type === 'leaf-list') {
                let type = "string";
                if(node.__datatype === 'INT'){
                    type = 'number';
                }
                if(node.__datatype === 'STRING'){
                    type = 'string';
                }
                try
                {
                if(node?.__datatype?.toLowerCase() === 'boolean'){
                    type = 'boolean';
                }
                }
                catch(e)
                {
                    console.log(e)
                }
                schema.properties[key] = {
                    type: type,
                    title: toPascalCase(node.__displayname),
                    readyOnly:node.__config==="true"? false:true,
                    enums : node.__enum ? node.__enum:null,
                    displayType : node.__displayType ? node.__displayType:null,
                    patterns : node.__pattern ? node.__pattern:null,
                    helperText:node.__helperText ? node.__helperText:null,
                    maxLen : node.__maxLength ? node.__maxLength:null,
                    minLen: node.__minLength ? node.__minLength:null,
                    defaultvalues: node.__defaultvalues ? node.__defaultvalues:null,
                };
            }
        });
    };

    traverse(data);
    return schema;
};

// Example usage:
//const schemaa = generateSchema(jsonData['nodetyp+pfnmame']['moduleCapability']);
const schemaa = generateSchema(jsonData['rpc-reply']['RUConfig']);
console.log(schemaa);

export default schemaa;
