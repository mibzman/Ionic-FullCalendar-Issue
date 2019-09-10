import { Component, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { environment } from "../../environments/environment";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"]
})
export class HomePage {
	@ViewChild("calendar") calendarComponent: FullCalendarComponent;

	calendarVisible = true;

	sourceURL = environment.sourceURL;

	APIKey = environment.GoogleAPI;

	sourceStuff = [
		{
			googleCalendarId: this.sourceURL
		}
	];

	calendarPlugins = [
		dayGridPlugin,
		timeGrigPlugin,
		interactionPlugin,
		listPlugin,
		googleCalendarPlugin
	];

	ngAfterViewInit() {
		this.height();
		this.gcal();
	}

	height() {
		let calendarAPI = this.calendarComponent.getApi();
		calendarAPI.setOption("height", 700);
	}

	gcal() {
		let calendarAPI = this.calendarComponent.getApi();
		calendarAPI.setOption("googleCalendarApiKey", this.APIKey);

		calendarAPI.refetchEvents();
	}

	handleDateClick(arg) {
		console.log("date has been clicked");
		let calendarAPI = this.calendarComponent.getApi();
		calendarAPI.changeView("listMonth");
	}
}
