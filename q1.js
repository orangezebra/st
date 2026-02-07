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

function printKeyValuePairsAtDepth(data, targetDepth) {
    function visit(node, isArrCb, isObjCb = null) {
        if (Array.isArray(node)) {
            node.forEach((item, index) => {
                isArrCb(index, item);
            });
        } else {
            Object.entries(node).forEach(([key, value]) => {
                isObjCb ? isObjCb(key, value) : isArrCb(key, value);
            });
        }
    }

    function onlyTopLevel(item) {
        if (Array.isArray(item)) {
            return item.map(i => typeof i === 'object' ? '[Object]' : i);
        } else if (typeof item === 'object') {
            return '[Object]';
        } else {
            return item;
        }
    }

    function traverse(node, currentDepth) {
        if (node === null || typeof node !== "object") return;

        if (currentDepth === targetDepth) {
            visit(
                node, 
                (index, item) => console.log(`[${index}]:`, onlyTopLevel(item)), 
                (key, value) => console.log(`${key}:`, onlyTopLevel(value))
            );
        }

        if (currentDepth < targetDepth) {
            visit(node, (i, item) => traverse(item, currentDepth + 1));
        }
    }
  
    traverse(data, 0);
}
  

printKeyValuePairsAtDepth(data, 2)