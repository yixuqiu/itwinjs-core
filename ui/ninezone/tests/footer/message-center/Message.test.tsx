/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 - present Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Message from "../../../src/footer/message-center/Message";

describe("<Message />", () => {
  it("should render", () => {
    mount(<Message />);
  });

  it("renders correctly", () => {
    shallow(<Message />).should.matchSnapshot();
  });
});
