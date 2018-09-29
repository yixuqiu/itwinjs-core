/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 - present Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as faker from "faker";
import * as moq from "./_helpers/Mocks";
import { IRulesetManager, RegisteredRuleset } from "../lib/IRulesetManager";
import { Ruleset, RuleTypes } from "../lib/rules";

describe("RegisteredRuleset", () => {

  let uniqueIdentifier: string;
  const managerMock = moq.Mock.ofType<IRulesetManager>();

  beforeEach(() => {
    managerMock.reset();
    uniqueIdentifier = faker.random.uuid();
  });

  describe("Ruleset implementation", () => {

    let ruleset: Ruleset;
    let registered: RegisteredRuleset;
    beforeEach(() => {
      ruleset = {
        id: faker.random.uuid(),
        supportedSchemas: { schemaNames: [faker.random.word()] },
        supplementationInfo: {
          supplementationPurpose: faker.random.words(),
        },
        rules: [{
          ruleType: RuleTypes.RootNodes,
          autoExpand: faker.random.boolean(),
        }],
        vars: [{
          label: faker.random.words(),
          vars: [],
        }],
      };
      registered = new RegisteredRuleset(managerMock.object, ruleset, uniqueIdentifier);
    });

    it("returns wrapper ruleset properties", () => {
      expect(registered.uniqueIdentifier).to.eq(uniqueIdentifier);
      expect(registered.id).to.deep.equal(ruleset.id);
      expect(registered.supportedSchemas).to.deep.equal(ruleset.supportedSchemas);
      expect(registered.supplementationInfo).to.deep.equal(ruleset.supplementationInfo);
      expect(registered.rules).to.deep.equal(ruleset.rules);
      expect(registered.vars).to.deep.equal(ruleset.vars);
      expect(registered.toJSON()).to.deep.equal(ruleset);
    });

  });

  describe("dispose", () => {

    it("unregisters ruleset from IRulesetManager", () => {
      const ruleset: Ruleset = {
        id: faker.random.uuid(),
        rules: [],
      };
      const registered = new RegisteredRuleset(managerMock.object, ruleset, uniqueIdentifier);
      registered.dispose();
      managerMock.verify((x) => x.remove(registered), moq.Times.once());
    });

  });

});
