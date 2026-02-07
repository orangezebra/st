const data = [
    {
      guest_id: 177,
      guest_type: "crew",
      first_name: "Marco",
      middle_name: null,
      last_name: "Burns",
      gender: "M",
      guest_booking: [
        {
          booking_number: 20008683,
          ship_code: "OST",
          room_no: "A0073",
          start_time: 1438214400,
          end_time: 1483142400,
          is_checked_in: true,
        },
      ],
      guest_account: [
        {
          account_id: 20009503,
          status_id: 2,
          account_limit: 0,
          allow_charges: true,
        },
      ],
    },
    {
      guest_id: 10000113,
      guest_type: "crew",
      first_name: "Bob Jr ",
      middle_name: "Charles",
      last_name: "Hemingway",
      gender: "M",
      guest_booking: [
        {
          booking_number: 10000013,
          room_no: "B0092",
          is_checked_in: true,
        },
      ],
      guest_account: [
        {
          account_id: 10000522,
          account_limit: 300,
          allow_charges: true,
        },
      ],
    },
    {
      guest_id: 10000114,
      guest_type: "crew",
      first_name: "Al ",
      middle_name: "Bert",
      last_name: "Santiago",
      gender: "M",
      guest_booking: [
        {
          booking_number: 10000014,
          room_no: "A0018",
          is_checked_in: true,
        },
      ],
      guest_account: [
        {
          account_id: 10000013,
          account_limit: 300,
          allow_charges: false,
        },
      ],
    },
    {
      guest_id: 10000115,
      guest_type: "crew",
      first_name: "Red ",
      middle_name: "Ruby",
      last_name: "Flowers ",
      gender: "F",
      guest_booking: [
        {
          booking_number: 10000015,
          room_no: "A0051",
          is_checked_in: true,
        },
      ],
      guest_account: [
        {
          account_id: 10000519,
          account_limit: 300,
          allow_charges: true,
        },
      ],
    },
    {
      guest_id: 10000116,
      guest_type: "crew",
      first_name: "Ismael ",
      middle_name: "Jean-Vital",
      last_name: "Jammes",
      gender: "M",
      guest_booking: [
        {
          booking_number: 10000016,
          room_no: "A0023",
          is_checked_in: true,
        },
      ],
      guest_account: [
        {
          account_id: 10000015,
          account_limit: 300,
          allow_charges: true,
        },
      ],
    },
  ];

function deepSortByKeys(data, sortKeys) {
    // Recursively collect values for target keys inside an object
    function findKeys(obj, result = {}) {
        if (obj === null || typeof obj !== "object") return result;
    
        if (!Array.isArray(obj)) {
            for (const [k, v] of Object.entries(obj)) {
                if (sortKeys.includes(k)) {
                    result[k] = v;
                }
                findKeys(v, result);
            }
        } else {
            obj.forEach(item => findKeys(item, result));
        }
    
        return result;
    }
  
    // Comparator using multiple keys
    function comparator(a, b) {
        const aVals = findKeys(a);
        const bVals = findKeys(b);
    
        for (const key of sortKeys) {
            const av = aVals[key];
            const bv = bVals[key];
    
            if (av === undefined && bv === undefined) continue;
            if (av === undefined) return 1;
            if (bv === undefined) return -1;
    
            if (av < bv) return -1;
            if (av > bv) return 1;
        }
    
        return 0;
    }
  
    // Walk the structure and sort arrays in place
    function traverse(node) {
        if (node === null || typeof node !== "object") return;
    
        if (Array.isArray(node)) {
            // Sort only arrays of objects
            if (node.every(v => v && typeof v === "object")) {
                node.sort(comparator);
            }
    
            node.forEach(traverse);
        } else {
            Object.values(node).forEach(traverse);
        }
    }
  
    traverse(data);
    return data;
}


console.log(JSON.stringify(deepSortByKeys(data, ["account_limit", "guest_id"]), null, 2));