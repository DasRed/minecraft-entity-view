import SquaremapSettingsInterface from '@/squaremap/interfaces/SettingsInterface';

export default <SquaremapSettingsInterface>{
    ui:     {
        sidebar:     {
            player_list_label: 'Players ({cur}/{max})',
            world_list_label:  'Worlds',
            pinned:            'unpinned',
        },
    },
    worlds: [
        {
            name:         'minecraft_overworld',
            icon:         '',
            display_name: 'minecraft:overworld',
            type:         'normal',
            order:        0,
        },
        {
            name:         'minecraft_the_end',
            icon:         '',
            display_name: 'minecraft:the_end',
            type:         'the_end',
            order:        0,
        },
        {
            name:         'minecraft_the_nether',
            icon:         '',
            display_name: 'minecraft:the_nether',
            type:         'nether',
            order:        0,
        },
    ],
};