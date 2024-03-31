import { test } from "vitest";
import { describe } from "vitest";
import React from "../react/React"
import { expect } from "vitest";

describe("create element" , () => {
    test("base", () => {
        const ele = React.createElement("div", { id: "app" }, "hi- ", "mini-react");
        
        expect(ele).toMatchInlineSnapshot(`
         {
               "props": {
                 "children": [
                   {
                     "props": {
                       "children": [],
                       "nodeValue": "hi- ",
                     },
                     "type": "ELEMENT_TEXT",
                   },
                   {
                     "props": {
                       "children": [],
                       "nodeValue": "mini-react",
                     },
                     "type": "ELEMENT_TEXT",
                   },
                 ],
                 "id": "app",
               },
               "type": "div",
             }
        `)
    })

    test("props is null", () => {
        const ele = React.createElement("div", null, "hi");
        
        expect(ele).toMatchInlineSnapshot(`
         {
               "props": {
                 "children": [
                   {
                     "props": {
                       "children": [],
                       "nodeValue": "hi",
                     },
                     "type": "ELEMENT_TEXT",
                   },
                 ],
               },
               "type": "div",
             }
        `)
    })

    test("props is null", () => {
        const ele = React.createElement("div", null, "hi");
        
        expect(ele).toMatchInlineSnapshot(`
         {
               "props": {
                 "children": [
                   {
                     "props": {
                       "children": [],
                       "nodeValue": "hi",
                     },
                     "type": "ELEMENT_TEXT",
                   },
                 ],
               },
               "type": "div",
             }
        `)
    })
    

})