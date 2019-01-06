function convert(input) {
  const reps = input['ReputationRecipes'];
  const list = [];
  Object.keys(reps).forEach(name =>
      list.push(getRepData(name, reps[name])));
  return list;
}

function getRepData(name, repData) {
  const rep = {
    id: 0,
    name: name,
    vendors: getVendorData(repData.Vendor),
    professions: getProfessionData(repData.Professions),
    isAlly: repData.IsAlly,
    isHorde: repData.IsHorde
  };
  return rep;
}

function getVendorData(vendors) {
  const list =[];
  Object.keys(vendors).forEach((name) => {
    list.push({
      name: name,
      isAlly: vendors[name].IsAlly,
      isHorde: vendors[name].IsHorde,
      locations: getVendorLocationData(vendors[name].Location)
    });
  });
  return list;
}

function getVendorLocationData(locations) {
  const list =[];
  Object.keys(locations).forEach(i => {
    list.push({
      npcId: locations[i].NpcID,
      zone: locations[i].Zone
    });
  });
  return list;
}

function getProfessionData(professions) {
  const list = {};
  Object.keys(professions)
      .forEach(profession =>
          list[profession] = setRecipesForProfession(professions[profession]));
  return list;
}

function setRecipesForProfession(profession) {
  if (!profession) {
    return;
  }
  const list = [];
  Object.keys(profession)
      .forEach(name =>
          objectFromProfession(profession[name], list));
  return list;
}

function objectFromProfession(recipe, list) {
  list.push({
    spellId: parseInt(recipe.Teaches.SpellID, 10),
    name: recipe.Teaches.Spell,
    rank: parseInt(recipe.Teaches.Rank, 10),
    cost: recipe.Cost,
    requieredStanding: recipe.ReputationLevel
  });
}


console.log(convert({
  "ReputationRecipes": {
    "Tortollan Seekers": {
      "IsAlly": true,
      "IsHorde": true,
      "Vendor": {
        "Collector Kojo": {
          "IsAlly": true,
          "IsHorde": true,
          "Location": {
            "1": {
              "NpcID": "134345",
              "Zone": "Zuldazar",
              "Location": "71.4, 30.2"
            },
            "2": {
              "NpcID": "135793",
              "Zone": "Stormsong Valley",
              "Location": "40.51, 36.49"
            }
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Endless Tincture of Renewed Combat (Rank 3)": {
            "ItemID": "162136",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Endless Tincture of Renewed Combat",
              "Rank": "3",
              "SpellID": "252363",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "18"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "18"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Siren's Alchemist Stone (Rank 3)": {
            "ItemID": "162137",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Siren's Alchemist Stone",
              "Rank": "3",
              "SpellID": "252370",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "18"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "18"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "18"
                }
              }
            }
          }
        },
        "Cooking": {
          "Recipe: Bountiful Captains Feast (Rank 2)": {
            "ItemID": "162288",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Bountiful Captains Feast",
              "Rank": "2",
              "SpellID": "259423",
              "Materials": {
                "Redtail Loach": {
                  "ItemID": "152549",
                  "Qty": "18"
                },
                "Frenzied Fangtooth": {
                  "ItemID": "152545",
                  "Qty": "18"
                },
                "Stringy Loins": {
                  "ItemID": "154897",
                  "Qty": "18"
                },
                "Meaty Haunch": {
                  "ItemID": "154898",
                  "Qty": "18"
                },
                "Kul Tiramisu": {
                  "ItemID": "154881",
                  "Qty": "11"
                },
                "Mon'Dazi": {
                  "ItemID": "154885",
                  "Qty": "11"
                },
                "Midnight Salmon": {
                  "ItemID": "162515",
                  "Qty": "5"
                }
              }
            }
          },
          "Recipe: Bountiful Captains Feast (Rank 3)": {
            "ItemID": "162289",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Bountiful Captains Feast",
              "Rank": "3",
              "SpellID": "259423",
              "Materials": {
                "Redtail Loach": {
                  "ItemID": "152549",
                  "Qty": "15"
                },
                "Frenzied Fangtooth": {
                  "ItemID": "152545",
                  "Qty": "15"
                },
                "Stringy Loins": {
                  "ItemID": "154897",
                  "Qty": "15"
                },
                "Meaty Haunch": {
                  "ItemID": "154898",
                  "Qty": "15"
                },
                "Kul Tiramisu": {
                  "ItemID": "154881",
                  "Qty": "10"
                },
                "Mon'Dazi": {
                  "ItemID": "154885",
                  "Qty": "10"
                },
                "Midnight Salmon": {
                  "ItemID": "162515",
                  "Qty": "5"
                }
              }
            }
          },
          "Recipe: Galley Banquet (Rank 3)": {
            "ItemID": "162287",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Galley Banquet",
              "Rank": "3",
              "SpellID": "259420",
              "Materials": {
                "Briny Flesh": {
                  "ItemID": "152631",
                  "Qty": "8"
                },
                "Thick Paleo Steak": {
                  "ItemID": "154899",
                  "Qty": "8"
                },
                "Sand Shifter": {
                  "ItemID": "152543",
                  "Qty": "8"
                },
                "Tiragarde Perch": {
                  "ItemID": "152548",
                  "Qty": "8"
                },
                "Foosaka": {
                  "ItemID": "160400",
                  "Qty": "10"
                },
                "Fresh Potato": {
                  "ItemID": "160709",
                  "Qty": "25"
                },
                "Midnight Salmon": {
                  "ItemID": "162515",
                  "Qty": "2"
                }
              }
            }
          },
          "Recipe: Grilled Catfish (Rank 3)": {
            "ItemID": "162292",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Grilled Catfish",
              "Rank": "3",
              "SpellID": "259432",
              "Materials": {
                "Great Sea Catfish": {
                  "ItemID": "152547",
                  "Qty": "5"
                }
              }
            }
          },
          "Recipe: Seasoned Loins (Rank 3)": {
            "ItemID": "162293",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Seasoned Loins",
              "Rank": "3",
              "SpellID": "259435",
              "Materials": {
                "Stringy Loins": {
                  "ItemID": "154897",
                  "Qty": "10"
                },
                "Foosaka": {
                  "ItemID": "160400",
                  "Qty": "5"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Seal of Critical Strike (Rank 3)": {
            "ItemID": "162298",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Seal of Critical Strike",
              "Rank": "3",
              "SpellID": "255094",
              "Materials": {
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "8"
                }
              }
            }
          },
          "Formula: Enchant Ring - Seal of Versatility (Rank 3)": {
            "ItemID": "162301",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Seal of Versatility",
              "Rank": "3",
              "SpellID": "256298",
              "Materials": {
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Champions of Azeroth (Rank 2)": {
            "ItemID": "162373",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Champions of Azeroth",
              "Rank": "2",
              "SpellID": "256298",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                }
              }
            }
          },
          "Recipe: Contract: Tortollan Seekers (Rank 2)": {
            "ItemID": "162371",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Tortollan Seekers",
              "Rank": "2",
              "SpellID": "256295",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                }
              }
            }
          },
          "Recipe: Codex of the Quiet Mind (Rank 3)": {
            "ItemID": "162358",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Codex of the Quiet Mind",
              "Rank": "3",
              "SpellID": "256234",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "75"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "45"
                },
                "Viridescent Ink": {
                  "ItemID": "158189",
                  "Qty": "15"
                }
              }
            }
          },
          "Recipe: Darkmoon Card of War (Rank 3)": {
            "ItemID": "162377",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Darkmoon Card of War",
              "Rank": "3",
              "SpellID": "256246",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Viridescent Ink": {
                  "ItemID": "158189",
                  "Qty": "8"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Inked Vessel of Robust Regeneration (Rank 3)": {
            "ItemID": "162355",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Inked Vessel of Robust Regeneration",
              "Rank": "3",
              "SpellID": "256252",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "50"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "20"
                },
                "Viridescent Ink": {
                  "ItemID": "158189",
                  "Qty": "8"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Inscribed Vessel of Mysticism (Rank 3)": {
            "ItemID": "162352",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Inscribed Vessel of Mysticism",
              "Rank": "3",
              "SpellID": "256249",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "50"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "20"
                },
                "Viridescent Ink": {
                  "ItemID": "158189",
                  "Qty": "8"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Tome of the Quiet Mind (Rank 3)": {
            "ItemID": "162376",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Tome of the Quiet Mind",
              "Rank": "3",
              "SpellID": "256237",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "25"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "5"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "10"
                }
              }
            }
          },
          "Technique: Glyph of the Dolphin": {
            "ItemID": "162023",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Glyph of the Dolphin",
              "Rank": "1",
              "SpellID": "276059",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "10"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "30"
                }
              }
            }
          }
        },
        "Tailoring": {
          "Pattern: Embroidered Deep Sea Bag (Rank 2)": {
            "ItemID": "162026",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Embroidered Deep Sea Bag",
              "Rank": "2",
              "SpellID": "257129",
              "Materials": {
                "Embroidered Deap Sea Satin": {
                  "ItemID": "158378",
                  "Qty": "70"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "7"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          }
        }
      }
    },
    "Proudmoore Admiralty": {
      "IsAlly": true,
      "IsHorde": false,
      "Vendor": {
        "Provisioner Fray": {
          "IsAlly": true,
          "IsHorde": false,
          "NpcID": "135808",
          "Location": {
            "Zone": "Boralus",
            "Location": "67.56, 21.61"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Battle Potion of Intellect (Rank 3)": {
            "ItemID": "163316",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Intellect",
              "Rank": "3",
              "SpellID": "279164",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of the Vast Horizon (Rank 3)": {
            "ItemID": "162134",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of the Vast Horizon",
              "Rank": "3",
              "SpellID": "252356",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Winter's Kiss": {
                  "ItemID": "152508",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "15"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Coastal Mana Potion (Rank 3)": {
            "ItemID": "162254",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Coastal Mana Potion",
              "Rank": "3",
              "SpellID": "252387",
              "Materials": {
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "2"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Potion of Bursting Blood (Rank 3)": {
            "ItemID": "162130",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Potion of Bursting Blood",
              "Rank": "3",
              "SpellID": "252343",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Mastery (Rank 3)": {
            "ItemID": "162304",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Mastery",
              "Rank": "3",
              "SpellID": "255100",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Siphoning (Rank 3)": {
            "ItemID": "162316",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Enchant Weapon - Siphoning",
              "Rank": "3",
              "SpellID": "255112",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "4"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Masterful Navigation (Rank 3)": {
            "ItemID": "162317",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Enchant Weapon - Masterful Navigation",
              "Rank": "3",
              "SpellID": "268903",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Bionic Bifocals (Rank 2)": {
            "ItemID": "162327",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Bionic Bifocals",
              "SpellID": "272063",
              "Rank": "2",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Bionic Bifocals (Rank 3)": {
            "ItemID": "162328",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Bionic Bifocals",
              "SpellID": "272064",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: Finely-Tuned Stormsteel Destroyer (Rank 3)": {
            "ItemID": "162346",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Finely-Tuned Stormsteel Destroyer",
              "SpellID": "255459",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "20"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "8"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "5"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "5"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Proudmoore Admiralty (Rank 2)": {
            "ItemID": "162359",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Proudmoore Admiralty",
              "SpellID": "256276",
              "Rank": "2",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Tidal Amethyst Loop (Rank 3)": {
            "ItemID": "162380",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Tidal Amethyst Loop",
              "SpellID": "256519",
              "Rank": "3",
              "Materials": {
                "Tidal Amethyst": {
                  "ItemID": "154122",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Leatherworking": {
          "Recipe: Mistscale Knuckles (Rank 3)": {
            "ItemID": "162413",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Mistscale Knuckles",
              "SpellID": "256781",
              "Rank": "3",
              "Materials": {
                "Mistscale": {
                  "ItemID": "153051",
                  "Qty": "22"
                },
                "Calcified Bone": {
                  "ItemID": "154165",
                  "Qty": "16"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "2"
                }
              }
            }
          },
          "Recipe: Hardened Tempest Knuckles (Rank 3)": {
            "ItemID": "162414",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Hardened Tempest Knuckles",
              "SpellID": "256784",
              "Rank": "3",
              "Materials": {
                "Tempest Hide": {
                  "ItemID": "154722",
                  "Qty": "22"
                },
                "Calcified Bone": {
                  "ItemID": "154165",
                  "Qty": "16"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "2"
                }
              }
            }
          }
        }
      }
    },
    "Order of Embers": {
      "IsAlly": true,
      "IsHorde": false,
      "Vendor": {
        "Quartermaster Alcorn": {
          "IsAlly": true,
          "IsHorde": false,
          "NpcID": "135815",
          "Location": {
            "Zone": "Drustvar",
            "Location": "37.8, 49.0"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Battle Potion of Agility (Rank 3)": {
            "ItemID": "163314",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Agility",
              "SpellID": "279161",
              "Rank": "3",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of the Undertow (Rank 3)": {
            "ItemID": "162135",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of the Undertow",
              "SpellID": "252359",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Akunda's Bite": {
                  "ItemID": "152507",
                  "Qty": "10"
                },
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "15"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Potion of Rising Death (Rank 3)": {
            "ItemID": "162131",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Potion of Rising Death",
              "SpellID": "252346",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Coastal Rejuvenation Potion (Rank 3)": {
            "ItemID": "162256",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Coastal Rejuvenation Potion",
              "SpellID": "252390",
              "Rank": "3",
              "Materials": {
                "Coastal Healing Potion": {
                  "ItemID": "152494",
                  "Qty": "1"
                },
                "Coastal Mana Potion": {
                  "ItemID": "152495",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Versatility (Rank 3)": {
            "ItemID": "162256",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Versatility",
              "SpellID": "255101",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Gale-Force Striking (Rank 3)": {
            "ItemID": "162318",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Gale-Force Striking",
              "SpellID": "255143",
              "Rank": "3",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "4"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Versatile Navigation (Rank 3)": {
            "ItemID": "162320",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Versatile Navigation",
              "SpellID": "268879",
              "Rank": "3",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Orthogonal Optics (Rank 2)": {
            "ItemID": "162329",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Orthogonal Optics",
              "SpellID": "272066",
              "Rank": "2",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          },
          "Schematic: Frost-Laced Ammunition (Rank 3)": {
            "ItemID": "162322",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Frost-Laced Ammunition",
              "SpellID": "265102",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "18"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "5"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Orthogonal Optics (Rank 3)": {
            "ItemID": "162330",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Orthogonal Optics",
              "SpellID": "272067",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Order of Embers (Rank 2)": {
            "ItemID": "162631",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Order of Embers",
              "SpellID": "256279",
              "Rank": "2",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Royal Quartz Loop (Rank 3)": {
            "ItemID": "162381",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Royal Quartz Loop",
              "SpellID": "256521",
              "Rank": "3",
              "Materials": {
                "Royal Quartz": {
                  "ItemID": "154125",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Leatherworking": {
          "Recipe: Recurve Bow of the Strands (Rank 3)": {
            "ItemID": "162512",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Recurve Bow of the Strands",
              "SpellID": "256789",
              "Rank": "3",
              "Materials": {
                "Star Wood": {
                  "ItemID": "11291",
                  "Qty": "8"
                },
                "Tempest Hide": {
                  "ItemID": "154722",
                  "Qty": "25"
                },
                "Calcified Bone": {
                  "ItemID": "154165",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "3"
                }
              }
            }
          }
        },
        "Tailoring": {
          "Pattern: Deep Sea Bag (Rank 3)": {
            "ItemID": "162421",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Deep Sea Bag",
              "SpellID": "257127",
              "Rank": "3",
              "Materials": {
                "Deep Sea Satin": {
                  "ItemID": "152577",
                  "Qty": "25"
                },
                "Tidespray Linen": {
                  "ItemID": "152576",
                  "Qty": "12"
                },
                "Nylon Thread": {
                  "ItemID": "159959",
                  "Qty": "12"
                }
              }
            }
          },
          "Pattern: Embroidered Deep Sea Cloak (Rank 3)": {
            "ItemID": "162427",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Embroidered Deep Sea Cloak",
              "SpellID": "257116",
              "Rank": "3",
              "Materials": {
                "Embroidered Deep Sea Satin": {
                  "ItemID": "158378",
                  "Qty": "10"
                },
                "Deep Sea Satin": {
                  "ItemID": "152577",
                  "Qty": "6"
                },
                "Nylon Thread": {
                  "ItemID": "159959",
                  "Qty": "8"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        }
      }
    },
    "Storm's Wake": {
      "IsAlly": true,
      "IsHorde": false,
      "Vendor": {
        "Sister Lilyana": {
          "IsAlly": true,
          "IsHorde": false,
          "NpcID": "135800",
          "Location": {
            "Zone": "Stormsong Valley",
            "Location": "59.27, 69.37"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Potion of Replenishment (Rank 3)": {
            "ItemID": "162129",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Potion of Replenishment",
              "SpellID": "252340",
              "Rank": "3",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of Endless Fathoms (Rank 3)": {
            "ItemID": "162133",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of Endless Fathoms",
              "SpellID": "252353",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Winter's Kiss": {
                  "ItemID": "152508",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "15"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Coastal Healing Potion (Rank 3)": {
            "ItemID": "162255",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Coastal Healing Potion",
              "SpellID": "252384",
              "Rank": "3",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "2"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Battle Potion of Stamina (Rank 3)": {
            "ItemID": "163318",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Stamina",
              "SpellID": "279167",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Haste (Rank 3)": {
            "ItemID": "162303",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Haste",
              "SpellID": "255099",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Stalwart Navigation (Rank 3)": {
            "ItemID": "162312",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Stalwart Navigation",
              "SpellID": "268915",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Deadly Navigation (Rank 3)": {
            "ItemID": "162313",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Deadly Navigation",
              "SpellID": "268909",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Gearspun Goggles (Rank 2)": {
            "ItemID": "162325",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Gearspun Goggles",
              "SpellID": "272060",
              "Rank": "2",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Gearspun Goggles (Rank 3)": {
            "ItemID": "162326",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Gearspun Goggles",
              "SpellID": "272061",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: Organic Discombobulation Grenade (Rank 3)": {
            "ItemID": "162337",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Organic Discombobulation Grenade",
              "SpellID": "255409",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "8"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "3"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Interdimensional Companion Repository (Rank 3)": {
            "ItemID": "162341",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Interdimensional Companion Repository",
              "SpellID": "256084",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "5"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "4"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Deployable Attire Rearranger (Rank 3)": {
            "ItemID": "162342",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Deployable Attire Rearranger",
              "SpellID": "256156",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "5"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "4"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Storm's Wake (Rank 2)": {
            "ItemID": "162363",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Storm's Wake",
              "SpellID": "256282",
              "Rank": "2",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Owlseye Loop (Rank 3)": {
            "ItemID": "162379",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Owlseye Loop",
              "SpellID": "256517",
              "Rank": "3",
              "Materials": {
                "Owlseye": {
                  "ItemID": "154120",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Design: Laribole Staff of Alacrity (Rank 3)": {
            "ItemID": "162382",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Laribole Staff of Alacrity",
              "SpellID": "256257",
              "Rank": "3",
              "Materials": {
                "Laribole": {
                  "ItemID": "154124",
                  "Qty": "6"
                },
                "Royal Quartz": {
                  "ItemID": "154125",
                  "Qty": "6"
                },
                "Tidal Amethyst": {
                  "ItemID": "154122",
                  "Qty": "6"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "12"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Design: Scarlet Diamond Staff of Intuition (Rank 3)": {
            "ItemID": "162385",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Laribole Staff of Alacrity",
              "SpellID": "256260",
              "Rank": "3",
              "Materials": {
                "Scarlet Diamond": {
                  "ItemID": "154121",
                  "Qty": "6"
                },
                "Owlseye": {
                  "ItemID": "154120",
                  "Qty": "6"
                },
                "Amberblaze": {
                  "ItemID": "154123",
                  "Qty": "6"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "12"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        }
      }
    },
    "7th Legion": {
      "IsAlly": true,
      "IsHorde": false,
      "Vendor": {
        "Vindicator Jaelaana": {
          "IsAlly": true,
          "IsHorde": false,
          "NpcID": "135446",
          "Location": {
            "Zone": "Tiragarde Sound",
            "Location": "74.1, 25.8"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Steelskin Potion (Rank 3)": {
            "ItemID": "162128",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Steelskin Potion",
              "SpellID": "252336",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of the Currents (Rank 3)": {
            "ItemID": "162132",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of the Currents",
              "SpellID": "252350",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Akunda's Bite": {
                  "ItemID": "152507",
                  "Qty": "10"
                },
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "50"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Endless Tincture of Fractional Power (Rank 3)": {
            "ItemID": "162138",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Endless Tincture of Fractional Power",
              "SpellID": "252378",
              "Rank": "3",
              "Materials": {
                "Flask of the Currents": {
                  "ItemID": "152638",
                  "Qty": "1"
                },
                "Flask of Endless Fathoms": {
                  "ItemID": "152639",
                  "Qty": "1"
                },
                "Flask of the Vast Horizon": {
                  "ItemID": "152640",
                  "Qty": "1"
                },
                "Flask of the Undertow": {
                  "ItemID": "152641",
                  "Qty": "1"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "6"
                }
              }
            }
          },
          "Recipe: Surging Alchemist Stone (Rank 3)": {
            "ItemID": "162139",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Surging Alchemist Stone",
              "SpellID": "252381",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "14"
                },
                "Akunda's Bite": {
                  "ItemID": "152507",
                  "Qty": "35"
                },
                "Winter's Kiss": {
                  "ItemID": "152508",
                  "Qty": "35"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "18"
                }
              }
            }
          },
          "Recipe: Battle Potion of Strength (Rank 3)": {
            "ItemID": "163320",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Strength",
              "SpellID": "279170",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Blacksmithing": {
          "Recipe: Stormsteel Shield (Rank 3)": {
            "ItemID": "162261",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Shield",
              "SpellID": "253118",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "22"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "10"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "12"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Stormsteel Dagger (Rank 3)": {
            "ItemID": "162275",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Dagger",
              "SpellID": "253158",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "16"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "6"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Stormsteel Spear (Rank 3)": {
            "ItemID": "162276",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Spear",
              "SpellID": "253161",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "28"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "9"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Stormsteel Saber (Rank 3)": {
            "ItemID": "162670",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Saber",
              "SpellID": "278133",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "22"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "10"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "12"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Critical Strike (Rank 3)": {
            "ItemID": "162302",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Critical Strike",
              "SpellID": "255098",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Recipe: Enchanter's Sorcerous Scepter (Rank 3)": {
            "ItemID": "162306",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Enchanter's Sorcerous Scepter",
              "SpellID": "265112",
              "Rank": "3",
              "Materials": {
                "Star Wood": {
                  "ItemID": "11291",
                  "Qty": "1"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Synthetic Specs (Rank 2)": {
            "ItemID": "162323",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Synthetic Specs",
              "SpellID": "272057",
              "Rank": "2",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Synthetic Specs (Rank 3)": {
            "ItemID": "162324",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Synthetic Specs",
              "SpellID": "272058",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: Monelite Scope of Alacrity (Rank 3)": {
            "ItemID": "162344",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Monelite Scope of Alacrity",
              "SpellID": "264967",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "10"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Precision Attitude Adjuster (Rank 3)": {
            "ItemID": "162345",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Precision Attitude Adjuster",
              "SpellID": "253152",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "8"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Finely-Tuned Stormsteel Destroyer (Rank 3)": {
            "ItemID": "162346",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Finely-Tuned Stormsteel Destroyer",
              "SpellID": "255459",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "8"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "20"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "5"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "5"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Amberblaze Loop (Rank 3)": {
            "ItemID": "162378",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Amberblaze Loop",
              "SpellID": "256515",
              "Rank": "3",
              "Materials": {
                "Amberblaze": {
                  "ItemID": "154123",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        }
      }
    },
    "Zandalari Empire": {
      "IsAlly": false,
      "IsHorde": true,
      "Vendor": {
        "Natal'hakata": {
          "IsAlly": false,
          "IsHorde": true,
          "NpcID": "131287",
          "Location": {
            "Zone": "Zuldazar",
            "Location": "58.3, 44.4"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Potion of Replenishment (Rank 3)": {
            "ItemID": "162692",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Potion of Replenishment",
              "SpellID": "252340",
              "Rank": "3",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of Endless Fathoms (Rank 3)": {
            "ItemID": "162696",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of Endless Fathoms",
              "SpellID": "252353",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Winter's Kiss": {
                  "ItemID": "152508",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "15"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Coastal Healing Potion (Rank 3)": {
            "ItemID": "162704",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Coastal Healing Potion",
              "SpellID": "252384",
              "Rank": "3",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "2"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Battle Potion of Stamina (Rank 3)": {
            "ItemID": "163317",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Stamina",
              "SpellID": "279167",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Haste (Rank 3)": {
            "ItemID": "162717",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Haste",
              "SpellID": "255099",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Stalwart Navigation (Rank 3)": {
            "ItemID": "162721",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Stalwart Navigation",
              "SpellID": "268915",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Deadly Navigation (Rank 3)": {
            "ItemID": "162722",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Deadly Navigation",
              "SpellID": "268909",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Gearspun Goggles (Rank 2)": {
            "ItemID": "162730",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Gearspun Goggles",
              "SpellID": "272060",
              "Rank": "2",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Gearspun Goggles (Rank 3)": {
            "ItemID": "162731",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Gearspun Goggles",
              "SpellID": "272061",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: Organic Discombobulation Grenade (Rank 3)": {
            "ItemID": "162741",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Organic Discombobulation Grenade",
              "SpellID": "255409",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "8"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "3"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Interdimensional Companion Repository (Rank 3)": {
            "ItemID": "162742",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Interdimensional Companion Repository",
              "SpellID": "256084",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "5"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "4"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Deployable Attire Rearranger (Rank 3)": {
            "ItemID": "162743",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Deployable Attire Rearranger",
              "SpellID": "256156",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "5"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "4"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Zandalari Empire (Rank 2)": {
            "ItemID": "162753",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Zandalari Empire",
              "SpellID": "256285",
              "Rank": "2",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Owlseye Loop (Rank 3)": {
            "ItemID": "162761",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Owlseye Loop",
              "SpellID": "256517",
              "Rank": "3",
              "Materials": {
                "Owlseye": {
                  "ItemID": "154120",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Design: Laribole Staff of Alacrity (Rank 3)": {
            "ItemID": "162764",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Laribole Staff of Alacrity",
              "SpellID": "256257",
              "Rank": "3",
              "Materials": {
                "Laribole": {
                  "ItemID": "154124",
                  "Qty": "6"
                },
                "Royal Quartz": {
                  "ItemID": "154125",
                  "Qty": "6"
                },
                "Tidal Amethyst": {
                  "ItemID": "154122",
                  "Qty": "6"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "12"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Design: Scarlet Diamond Staff of Intuition (Rank 3)": {
            "ItemID": "162765",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Laribole Staff of Alacrity",
              "SpellID": "256260",
              "Rank": "3",
              "Materials": {
                "Scarlet Diamond": {
                  "ItemID": "154121",
                  "Qty": "6"
                },
                "Owlseye": {
                  "ItemID": "154120",
                  "Qty": "6"
                },
                "Amberblaze": {
                  "ItemID": "154123",
                  "Qty": "6"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "12"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        }
      }
    },
    "Talanji's Expedition": {
      "IsAlly": false,
      "IsHorde": true,
      "Vendor": {
        "Provisioner Lija": {
          "IsAlly": false,
          "IsHorde": true,
          "NpcID": "135459",
          "Location": {
            "Zone": "Nazmir",
            "Location": "39.11, 79.47"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Battle Potion of Intellect (Rank 3)": {
            "ItemID": "163315",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Intellect",
              "Rank": "3",
              "SpellID": "279164",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of the Vast Horizon (Rank 3)": {
            "ItemID": "162697",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of the Vast Horizon",
              "Rank": "3",
              "SpellID": "252356",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Winter's Kiss": {
                  "ItemID": "152508",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "15"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Coastal Mana Potion (Rank 3)": {
            "ItemID": "162703",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Coastal Mana Potion",
              "Rank": "3",
              "SpellID": "252387",
              "Materials": {
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "2"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Potion of Bursting Blood (Rank 3)": {
            "ItemID": "162693",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Potion of Bursting Blood",
              "Rank": "3",
              "SpellID": "252343",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Mastery (Rank 3)": {
            "ItemID": "162718",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Mastery",
              "Rank": "3",
              "SpellID": "255100",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Siphoning (Rank 3)": {
            "ItemID": "162723",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Enchant Weapon - Siphoning",
              "Rank": "3",
              "SpellID": "255112",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "4"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Masterful Navigation (Rank 3)": {
            "ItemID": "162724",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Enchant Weapon - Masterful Navigation",
              "Rank": "3",
              "SpellID": "268903",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Bionic Bifocals (Rank 2)": {
            "ItemID": "162732",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Bionic Bifocals",
              "SpellID": "272063",
              "Rank": "2",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Bionic Bifocals (Rank 3)": {
            "ItemID": "162733",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Bionic Bifocals",
              "SpellID": "272064",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Talanji's Expedition (Rank 2)": {
            "ItemID": "162754",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Talanji's Expedition",
              "SpellID": "256288",
              "Rank": "2",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Tidal Amethyst Loop (Rank 3)": {
            "ItemID": "162762",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Tidal Amethyst Loop",
              "SpellID": "256519",
              "Rank": "3",
              "Materials": {
                "Tidal Amethyst": {
                  "ItemID": "154122",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Leatherworking": {
          "Recipe: Mistscale Knuckles (Rank 3)": {
            "ItemID": "162767",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Mistscale Knuckles",
              "SpellID": "256781",
              "Rank": "3",
              "Materials": {
                "Mistscale": {
                  "ItemID": "153051",
                  "Qty": "22"
                },
                "Calcified Bone": {
                  "ItemID": "154165",
                  "Qty": "16"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "2"
                }
              }
            }
          },
          "Recipe: Hardened Tempest Knuckles (Rank 3)": {
            "ItemID": "162768",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Hardened Tempest Knuckles",
              "SpellID": "256784",
              "Rank": "3",
              "Materials": {
                "Tempest Hide": {
                  "ItemID": "154722",
                  "Qty": "22"
                },
                "Calcified Bone": {
                  "ItemID": "154165",
                  "Qty": "16"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "2"
                }
              }
            }
          }
        }
      }
    },
    "Voldunai": {
      "IsAlly": false,
      "IsHorde": true,
      "Vendor": {
        "Hoarder Jena": {
          "IsAlly": false,
          "IsHorde": true,
          "NpcID": "135804",
          "Location": {
            "Zone": "Vol'dun",
            "Location": "56.70, 49.80"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Battle Potion of Agility (Rank 3)": {
            "ItemID": "163313",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Agility",
              "SpellID": "279161",
              "Rank": "3",
              "Materials": {
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of the Undertow (Rank 3)": {
            "ItemID": "162698",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of the Undertow",
              "SpellID": "252359",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Akunda's Bite": {
                  "ItemID": "152507",
                  "Qty": "10"
                },
                "Siren's Pollen": {
                  "ItemID": "152509",
                  "Qty": "15"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Potion of Rising Death (Rank 3)": {
            "ItemID": "162694",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Potion of Rising Death",
              "SpellID": "252346",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Coastal Rejuvenation Potion (Rank 3)": {
            "ItemID": "162705",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Coastal Rejuvenation Potion",
              "SpellID": "252390",
              "Rank": "3",
              "Materials": {
                "Coastal Healing Potion": {
                  "ItemID": "152494",
                  "Qty": "1"
                },
                "Coastal Mana Potion": {
                  "ItemID": "152495",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Versatility (Rank 3)": {
            "ItemID": "162719",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Versatility",
              "SpellID": "255101",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Gale-Force Striking (Rank 3)": {
            "ItemID": "162725",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Gale-Force Striking",
              "SpellID": "255143",
              "Rank": "3",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "4"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          },
          "Formula: Enchant Weapon - Versatile Navigation (Rank 3)": {
            "ItemID": "162726",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Weapon Enchant - Versatile Navigation",
              "SpellID": "268879",
              "Rank": "3",
              "Materials": {
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "5"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                },
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Orthogonal Optics (Rank 2)": {
            "ItemID": "162734",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Orthogonal Optics",
              "SpellID": "272066",
              "Rank": "2",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          },
          "Schematic: Frost-Laced Ammunition (Rank 3)": {
            "ItemID": "162727",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Frost-Laced Ammunition",
              "SpellID": "265102",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "18"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "5"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Orthogonal Optics (Rank 3)": {
            "ItemID": "162735",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Orthogonal Optics",
              "SpellID": "272067",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Inscription": {
          "Recipe: Contract: Contract: Voldunai (Rank 2)": {
            "ItemID": "162755",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "Contract: Order of Embers",
              "SpellID": "256291",
              "Rank": "2",
              "Materials": {
                "Light Parchment": {
                  "ItemID": "39354",
                  "Qty": "1"
                },
                "Ultramarine Ink": {
                  "ItemID": "158187",
                  "Qty": "15"
                },
                "Crimson Ink": {
                  "ItemID": "158188",
                  "Qty": "8"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Royal Quartz Loop (Rank 3)": {
            "ItemID": "162763",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Royal Quartz Loop",
              "SpellID": "256521",
              "Rank": "3",
              "Materials": {
                "Royal Quartz": {
                  "ItemID": "154125",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Leatherworking": {
          "Recipe: Recurve Bow of the Strands (Rank 3)": {
            "ItemID": "162766",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Recurve Bow of the Strands",
              "SpellID": "256789",
              "Rank": "3",
              "Materials": {
                "Star Wood": {
                  "ItemID": "11291",
                  "Qty": "8"
                },
                "Tempest Hide": {
                  "ItemID": "154722",
                  "Qty": "25"
                },
                "Calcified Bone": {
                  "ItemID": "154165",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "3"
                }
              }
            }
          }
        },
        "Tailoring": {
          "Pattern: Deep Sea Bag (Rank 3)": {
            "ItemID": "162769",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Deep Sea Bag",
              "SpellID": "257127",
              "Rank": "3",
              "Materials": {
                "Deep Sea Satin": {
                  "ItemID": "152577",
                  "Qty": "25"
                },
                "Tidespray Linen": {
                  "ItemID": "152576",
                  "Qty": "12"
                },
                "Nylon Thread": {
                  "ItemID": "159959",
                  "Qty": "12"
                }
              }
            }
          },
          "Pattern: Embroidered Deep Sea Cloak (Rank 3)": {
            "ItemID": "162772",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Embroidered Deep Sea Cloak",
              "SpellID": "257116",
              "Rank": "3",
              "Materials": {
                "Embroidered Deep Sea Satin": {
                  "ItemID": "158378",
                  "Qty": "10"
                },
                "Deep Sea Satin": {
                  "ItemID": "152577",
                  "Qty": "6"
                },
                "Nylon Thread": {
                  "ItemID": "159959",
                  "Qty": "8"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        }
      }
    },
    "The Honorbound": {
      "IsAlly": false,
      "IsHorde": true,
      "Vendor": {
        "Ransa Greyfeather": {
          "IsAlly": false,
          "IsHorde": true,
          "NpcID": "135447",
          "Location": {
            "Zone": "Dazar'Alor",
            "Location": "50.08, 99.66"
          }
        }
      },
      "Professions": {
        "Alchemy": {
          "Recipe: Steelskin Potion (Rank 3)": {
            "ItemID": "162691",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Steelskin Potion",
              "SpellID": "252336",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Riverbud": {
                  "ItemID": "152505",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Flask of the Currents (Rank 3)": {
            "ItemID": "162695",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Flask of the Currents",
              "SpellID": "252350",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "5"
                },
                "Akunda's Bite": {
                  "ItemID": "152507",
                  "Qty": "10"
                },
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "50"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Endless Tincture of Fractional Power (Rank 3)": {
            "ItemID": "162701",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Endless Tincture of Fractional Power",
              "SpellID": "252378",
              "Rank": "3",
              "Materials": {
                "Flask of the Currents": {
                  "ItemID": "152638",
                  "Qty": "1"
                },
                "Flask of Endless Fathoms": {
                  "ItemID": "152639",
                  "Qty": "1"
                },
                "Flask of the Vast Horizon": {
                  "ItemID": "152640",
                  "Qty": "1"
                },
                "Flask of the Undertow": {
                  "ItemID": "152641",
                  "Qty": "1"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "6"
                }
              }
            }
          },
          "Recipe: Surging Alchemist Stone (Rank 3)": {
            "ItemID": "162702",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Surging Alchemist Stone",
              "SpellID": "252381",
              "Rank": "3",
              "Materials": {
                "Anchor Weed": {
                  "ItemID": "152510",
                  "Qty": "14"
                },
                "Akunda's Bite": {
                  "ItemID": "152507",
                  "Qty": "35"
                },
                "Winter's Kiss": {
                  "ItemID": "152508",
                  "Qty": "35"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "18"
                }
              }
            }
          },
          "Recipe: Battle Potion of Strength (Rank 3)": {
            "ItemID": "163319",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Battle Potion of Strength",
              "SpellID": "279170",
              "Rank": "3",
              "Materials": {
                "Sea Stalk": {
                  "ItemID": "152511",
                  "Qty": "10"
                },
                "Star Moss": {
                  "ItemID": "152506",
                  "Qty": "8"
                },
                "Crystal Vial": {
                  "ItemID": "3371",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Blacksmithing": {
          "Recipe: Stormsteel Shield (Rank 3)": {
            "ItemID": "162706",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Shield",
              "SpellID": "253118",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "22"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "10"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "12"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Stormsteel Dagger (Rank 3)": {
            "ItemID": "162707",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Dagger",
              "SpellID": "253158",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "16"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "6"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Stormsteel Spear (Rank 3)": {
            "ItemID": "162708",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Spear",
              "SpellID": "253161",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "28"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "9"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          },
          "Recipe: Stormsteel Saber (Rank 3)": {
            "ItemID": "162774",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Stormsteel Saber",
              "SpellID": "278133",
              "Rank": "3",
              "Materials": {
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "22"
                },
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "10"
                },
                "Elemental Flux": {
                  "ItemID": "18567",
                  "Qty": "12"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Enchanting": {
          "Formula: Enchant Ring - Pact of Critical Strike (Rank 3)": {
            "ItemID": "162716",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Pact of Critical Strike",
              "SpellID": "255098",
              "Rank": "3",
              "Materials": {
                "Veiled Crystal": {
                  "ItemID": "152877",
                  "Qty": "4"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "3"
                },
                "Gloom Dust": {
                  "ItemID": "152875",
                  "Qty": "15"
                }
              }
            }
          },
          "Recipe: Enchanter's Sorcerous Scepter (Rank 3)": {
            "ItemID": "162720",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Enchanter's Sorcerous Scepter",
              "SpellID": "265112",
              "Rank": "3",
              "Materials": {
                "Star Wood": {
                  "ItemID": "11291",
                  "Qty": "1"
                },
                "Umbra Shard": {
                  "ItemID": "152876",
                  "Qty": "6"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        },
        "Engineering": {
          "Schematic: AZ3-R1-T3 Synthetic Specs (Rank 2)": {
            "ItemID": "162728",
            "ReputationLevel": "Honored",
            "Cost": [1100, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Synthetic Specs",
              "SpellID": "272057",
              "Rank": "2",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "18"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "48"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "23"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "2"
                }
              }
            }
          },
          "Schematic: AZ3-R1-T3 Synthetic Specs (Rank 3)": {
            "ItemID": "162729",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "AZ3-R1-T3 Synthetic Specs",
              "SpellID": "272058",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "15"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "45"
                },
                "Insulated Wiring": {
                  "ItemID": "163569",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "20"
                },
                "Hydrocore": {
                  "ItemID": "162460",
                  "Qty": "1"
                }
              }
            }
          },
          "Schematic: Monelite Scope of Alacrity (Rank 3)": {
            "ItemID": "162744",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Monelite Scope of Alacrity",
              "SpellID": "264967",
              "Rank": "3",
              "Materials": {
                "Monelite Ore": {
                  "ItemID": "152512",
                  "Qty": "10"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Precision Attitude Adjuster (Rank 3)": {
            "ItemID": "162745",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Precision Attitude Adjuster",
              "SpellID": "253152",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "8"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "20"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "5"
                }
              }
            }
          },
          "Schematic: Finely-Tuned Stormsteel Destroyer (Rank 3)": {
            "ItemID": "162746",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Finely-Tuned Stormsteel Destroyer",
              "SpellID": "255459",
              "Rank": "3",
              "Materials": {
                "Platinum Ore": {
                  "ItemID": "152513",
                  "Qty": "8"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "20"
                },
                "Chemical Blasting Cap": {
                  "ItemID": "160502",
                  "Qty": "5"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "5"
                }
              }
            }
          }
        },
        "Jewelcrafting": {
          "Design: Amberblaze Loop (Rank 3)": {
            "ItemID": "162760",
            "ReputationLevel": "Revered",
            "Cost": [1400, 0, 0],
            "Teaches": {
              "Spell": "Amberblaze Loop",
              "SpellID": "256515",
              "Rank": "3",
              "Materials": {
                "Amberblaze": {
                  "ItemID": "154123",
                  "Qty": "1"
                },
                "Storm Silver Ore": {
                  "ItemID": "152579",
                  "Qty": "10"
                },
                "Expulsom": {
                  "ItemID": "152668",
                  "Qty": "1"
                }
              }
            }
          }
        }
      }
    }
  }
}));