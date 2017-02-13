angular.module('app.services', [])

.service('MenuItemsService', ['$q', function($q) {
	var menuItems = [
      {
        name: 'Home',
        icon: 'dashboard',
        sref: '.home'
      },
      {
        name: 'Draft',
        icon: 'swap_vert',
        sref: '.draft'
      },
      {
        name: 'Players',
        icon: 'person',
        sref: '.players'
      }
    ];

    var sections = [];
    sections.push({
        name: 'Settings',
        type: 'toggle',
        pages: [{
            name: 'Sports',
            state: 'home.sports',
            type: 'link',
            icon: 'blur_circular'
        }, {
            name: 'Users',
            state: 'home.home',
            type: 'link',
            icon: 'people'
        },
        // {
        //     name: 'Wheat',
        //     state: 'home.home',
        //     type: 'link',
        //     icon: 'close'
        // }
        ]
    });

    var self;

	return self = {
		sections: sections,

		toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
        },

        isSectionSelected: function (section) {
            return self.openedSection === section;
        },

		loadAllItems : function() {
	        return $q.when(menuItems);
	    },

	    loadAllSettings : function() {
	    	return $q.when(sections);
	    }
	}
}])
