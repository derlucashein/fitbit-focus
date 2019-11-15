import * as Keys from '../shared/keys';

function Settings(props) {
    return (
      <Page>
        <Section>
          <ColorSelect
            settingsKey={Keys.COLOR}
            colors={[
              {color:'#b8fc68'},
              {color: 'tomato'},
              {color: 'sandybrown'},
              {color: 'gold'},
              {color: 'aquamarine'},
              {color: 'deepskyblue'},
              {color: 'plum'},
            ]}
          />
          <Select
            label={`Pomodoro duration`}
            settingsKey={Keys.SESSION}
            options={[
                {name:"10 minutes",   value:"10"},
                {name:"15 minutes",   value:"15"},
                {name:"20 minutes", value:"20"},
                {name:"25 minutes", value:"25"},
                {name:"30 minutes", value:"30"},
                {name:"35 minutes", value:"35"},
                {name:"40 minutes", value:"40"},
                {name:"45 minutes", value:"45"},
            ]}
            renderItem={
                (option) =>
                <Text>{option.name}</Text>
            }
            />

            <Select
                label={`Short break duration`}
                settingsKey={Keys.BREAK}
                options={[
                    {name:"1 minute",   value:"1"},
                    {name:"2 minutes",   value:"2"},
                    {name:"3 minutes", value:"3"},
                    {name:"4 minutes", value:"4"},
                    {name:"5 minutes", value:"5"},
                    {name:"6 minutes", value:"6"},
                    {name:"7 minutes", value:"7"},
                    {name:"8 minutes", value:"8"},
                    {name:"9 minutes", value:"9"},
                    {name:"10 minutes", value:"10"}
                ]}
                renderItem={
                    (option) =>
                    <Text>{option.name}</Text>
                }
            />

            <Select
                label={`Long break duration`}
                settingsKey={Keys.BREAK_LONG}
                options={[
                    {name:"10 minutes",   value:"10"},
                    {name:"15 minutes",   value:"15"},
                    {name:"20 minutes", value:"20"},
                    {name:"25 minutes", value:"25"},
                    {name:"30 minutes", value:"30"},
                ]}
                renderItem={
                    (option) =>
                    <Text>{option.name}</Text>
                }
            />
        </Section>

        

      </Page>
    );
  }
  
  registerSettingsPage(Settings);