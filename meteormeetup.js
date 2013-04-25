// METEOR DEVSHOP SIGN-IN APP || By Quebecisnice & David-bfg @Chez JJ

People = new Meteor.Collection("people");
Events = new Meteor.Collection("events");

if (Meteor.isClient) {

	Template.Meetup.people = function() {
		var event = Events.findOne({}, {
			sort : {
				date : -1
			}
		});
		if (event && event.attending.length != 0) {
			return People.find({
				_id : {
					$in : event.attending
				}
			}, {
				sort : {
					name : 1
				}
			});
		} else {
			return undefined;
		}
	};

	Template.Meetup.email_exists = function() {
		return Session.get("email");
	};

	Template.new_person.email_exists = function() {
		return Session.get("email");
	};

	Template.new_person.events = {
		'click input.add' : function() {
			Session.set("email", false);
			var email = document.getElementById("email").value;
			var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			if (!re.test(email)) {
				alert("invalid email format");
				return;
			}
			var person = People.findOne({
				email : email
			});
			if (person) {
				var event = Events.findOne({}, {
					sort : {
						date : -1
					}
				});
				var exists = false;
				for(var i = 0; i < event.attending.length && !exists; i++){
					exists = event.attending[i] == person._id;
				}
				if(!exists){
					if (event) {
						Events.update({
							_id : event._id
						}, {
							$push : {
								attending : person._id
							}
						});
					}
					
				printBadge(person._id);
				}
				document.getElementById("email").value = '';
				alert("Welcome to the future! Please pull DOWN on your name tag.")
			} else {
				Session.set("email", true);
			}
		},
		'click input.edit' : function() {
			Session.set("email", false);
			document.getElementById("name").value = '';
			document.getElementById("about").value = '';
		}
	};

	Template.details.events = {
		'click input.add' : function() {
			var email = document.getElementById("email").value;
			var name = document.getElementById("name").value.trim();
			var about = document.getElementById("about").value.trim();
			
			if (name.length == 0) {
				alert("requires a name");
				return;
			}
			var person = People.insert({
				email : email,
				name : name,
				about : about
			});
			var event = Events.findOne({}, {
				sort : {
					date : -1
				}
			});
			
			if (event) {
				Events.update({
					_id : event._id
				}, {
					$push : {
						attending : person
					}
				});
				
				printBadge(person);
			}
			
			document.getElementById("email").value = '';
			document.getElementById("name").value = '';
			document.getElementById("about").value = '';
			Session.set("email", false);
			alert("Welcome to the future! Take your name tag to proceed.");
		}
	}

		function printBadge(person_id) {
					console.log('somebody is trying to print');
					var person = People.findOne({
						_id : person_id
					});
					if (person) {
			            try
			            {
			                // open label
			                var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
<DieCutLabel Version="8.0" Units="twips">\
  <PaperOrientation>Landscape</PaperOrientation>\
  <Id>NameBadgeTag</Id>\
  <PaperName>30365 Name Badge Card - offset</PaperName>\
  <DrawCommands>\
    <Path>\
      <Line X1="3240" Y1="0" X2="3240" Y2="5040"/>\
      <LineTo X="270" Y="5040"/>\
      <Arc CenterX="185" CenterY="5040" Radius="85" StartAngle="0" EndAngle="90"/>\
      <LineTo X="0" Y="4955"/>\
      <LineTo X="0" Y="85"/>\
      <LineTo X="185" Y="85"/>\
      <Arc CenterX="185" CenterY="0" Radius="85" StartAngle="-90" EndAngle="0"/>\
      <LineTo X="3240" Y="0"/>\
    </Path>\
  </DrawCommands>\
  <ObjectInfo>\
    <TextObject>\
      <Name>name</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>True</IsVariable>\
      <HorizontalAlignment>Center</HorizontalAlignment>\
      <VerticalAlignment>Middle</VerticalAlignment>\
      <TextFitMode>AlwaysFit</TextFitMode>\
      <UseFullFontHeight>True</UseFullFontHeight>\
      <Verticalized>False</Verticalized>\
      <StyledText>\
        <Element>\
          <String>Click here to enter text</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="48" Bold="True" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="468" Y="339.3777" Width="4196.303" Height="1117.43"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <TextObject>\
      <Name>things</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>True</IsVariable>\
      <HorizontalAlignment>Center</HorizontalAlignment>\
      <VerticalAlignment>Middle</VerticalAlignment>\
      <TextFitMode>ShrinkToFit</TextFitMode>\
      <UseFullFontHeight>True</UseFullFontHeight>\
      <Verticalized>False</Verticalized>\
      <StyledText>\
        <Element>\
          <String>Click here to enter text</String>\
          <Attributes>\
            <Font Family="Lucida Grande" Size="18" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="494.9024" Y="1663.736" Width="4177.463" Height="600"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <TextObject>\
      <Name>TEXT</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>False</IsVariable>\
      <HorizontalAlignment>Right</HorizontalAlignment>\
      <VerticalAlignment>Top</VerticalAlignment>\
      <TextFitMode>None</TextFitMode>\
      <UseFullFontHeight>True</UseFullFontHeight>\
      <Verticalized>False</Verticalized>\
      <StyledText>\
        <Element>\
          <String>Meteor DevShop 2</String>\
          <Attributes>\
            <Font Family="Helvetica" Size="10" Bold="True" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="1070.362" Y="2603.092" Width="3648.934" Height="359.1582"/>\
  </ObjectInfo>\
  <ObjectInfo>\
    <TextObject>\
      <Name>TEXT_1</Name>\
      <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
      <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
      <LinkedObjectName></LinkedObjectName>\
      <Rotation>Rotation0</Rotation>\
      <IsMirrored>False</IsMirrored>\
      <IsVariable>False</IsVariable>\
      <HorizontalAlignment>Left</HorizontalAlignment>\
      <VerticalAlignment>Top</VerticalAlignment>\
      <TextFitMode>ShrinkToFit</TextFitMode>\
      <UseFullFontHeight>True</UseFullFontHeight>\
      <Verticalized>False</Verticalized>\
      <StyledText>\
        <Element>\
          <String>____________________________________</String>\
          <Attributes>\
            <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
          </Attributes>\
        </Element>\
      </StyledText>\
    </TextObject>\
    <Bounds X="468" Y="2351.855" Width="4327.707" Height="353.8872"/>\
  </ObjectInfo>\
</DieCutLabel>';
			                var label = dymo.label.framework.openLabelXml(labelXml);

			                // set label text
			                label.setObjectText("name", person.name);
			                label.setObjectText("things", person.about);
			                var event = Events.findOne({}, {
								sort : {
									date : -1
								}
							});
			                label.setObjectText("TEXT", event.event);
			                
			                // select printer to print on
			                // for simplicity sake just use the first LabelWriter printer
			                var printers = dymo.label.framework.getPrinters();
			                if (printers.length == 0)
			                    throw "No DYMO printers are installed. Install DYMO printers.";

			                var printerName = "";
			                for (var i = 0; i < printers.length; ++i)
			                {
			                    var printer = printers[i];
			                    if (printer.printerType == "LabelWriterPrinter")
			                    {
			                        printerName = printer.name;
			                        break;
			                    }
			                }
			                
			                if (printerName == "")
			                    throw "No LabelWriter printers found. Install LabelWriter printer";

			                // finally print the label
			                label.print(printerName);
			            }
			            catch(e)
			            {
			            	console.log(e.message || e);
			            }
						return true;
					}
					console.log('somebody sent an invalid person ID');
					return false;
				}
	}


if (Meteor.isServer) {
	if (!Events.findOne({}, {})) {
		Events.insert({event: "Meteor DevShop 2", date: new Date(), attending: []});
	}
}