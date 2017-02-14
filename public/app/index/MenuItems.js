// angular.module('app.services', [])
sportsFest
.service('MenuItemsService', ['$q', function($q) {
	var menuItems = [
      {
        name: 'Home',
        icon: 'dashboard',
        sref: '.home',
        show: true
      },
      {
        name: 'Draft',
        icon: 'swap_vert',
        sref: '.draft',
        show: false
      },
      {
        name: 'Players',
        icon: 'person',
        sref: '.players',
        show: false
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
            state: 'home.users',
            type: 'link',
            icon: 'people'
        },
        {
            name: 'Teams',
            state: 'home.teams',
            type: 'link',
            icon: 'person_add'
        }
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
