import { E20 } from "../../helpers/config.mjs";

import { makeBool, makeInt, makeStr, makeStrWithChoices } from "../generic-makers.mjs";

import { item } from './templates/item.mjs';
import { itemDescription } from './templates/item-description.mjs';
import { parentItem } from './templates/parent-item.mjs';

const fields = foundry.data.fields;

export class WeaponItemData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...item(),
      ...itemDescription(),
      ...parentItem(),
      availability: makeStrWithChoices('standard', Object.keys(E20.availabilities)),
      classification: new fields.SchemaField({
        size: makeStrWithChoices('integrated', Object.keys(E20.weaponSizes)),
      }),
      equipped: makeBool(true),
      requirements: new fields.SchemaField({
        custom: makeStr(null),
        skill: makeStrWithChoices(null, Object.keys(E20.skills)),
        shift: makeStrWithChoices(null, E20.weaponRequirementShifts),
      }),
      traits: new fields.ArrayField(
        makeStrWithChoices(Object.keys(E20.weaponTraits)),
      ),
      upgradeTraits: new fields.ArrayField(
        makeStrWithChoices(Object.keys(E20.weaponTraits)),
      ),
      usesPerScene: makeInt(null),
    };
  }
}
